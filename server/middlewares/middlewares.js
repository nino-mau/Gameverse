// **** IMPORT ****

// Dependencies
import jwt from 'jsonwebtoken';
import ms from 'ms';

// Functions
import { generateUserAccessToken } from '../utils/utils.js';
import { getUserDataById } from '../db/mysql.js';
import { verifyRefreshToken } from '../utils/utils.js';

// **** FUNCTIONS ****

// Validate user's access token
export async function authentificateAccessToken(req, res, next) {
   const token = req.cookies.accessToken;

   if (token) {
      try {
         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
         console.log('authentificateAccessToken: Token succesfuly validated');

         // Pass the user data to the controller function
         req.userData = decoded;
         next();
      } catch (error) {
         if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Access Token expired' });
         } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: 'Access Token invalid' });
         } else {
            console.error('authentificateAccessToken: Unexpected error');
            return res.status(500).json({ error: 'Internal server error.' });
         }
      }
   } else {
      console.error('authentificateAccessToken: No token reiceived');
      return res.status(401).json({ error: 'No token receive.' });
   }
}

// Validate user's refresh token and provide a new access token
export async function authentificateRefreshToken(req, res, next) {
   const token = req.cookies.refreshToken;

   if (token) {
      try {
         // Verify refresh token validity with jwt algorithm and with the db
         const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
         const r = await verifyRefreshToken(decoded.userId, decoded.tokenId);

         if (r) {
            console.log(
               'authentificateRefreshToken: Refresh token valid, new access token provided',
            );

            // Get user data from db
            const data = await getUserDataById(decoded.userId);
            const userData = {
               id: data.user_id,
               username: data.user_name,
               email: data.user_email,
            };
            console.log(userData);
            // generate new access token for user
            const accessToken = await generateUserAccessToken(userData);

            // Configure cookie for access token and sent it to client
            const accessTokenCookie = {
               httpOnly: true,
               secure: true,
               sameSite: 'none',
               domain: 'gameverse.local',
               maxAge: ms(process.env.ACCESS_TOKEN_DURATION), // 15 m
            };
            res.cookie('accessToken', accessToken, { ...accessTokenCookie });

            next();
         } else {
            console.error('authentificateRefreshToken: Refresh Token invalid');
            return res.status(403).json({ error: 'Refresh Token invalid' });
         }
      } catch (error) {
         if (error instanceof jwt.TokenExpiredError) {
            console.error('authentificateRefreshToken: Refresh Token expired');
            return res.status(401).json({ error: 'Refresh Token expired' });
         } else if (error instanceof jwt.JsonWebTokenError) {
            console.error('authentificateRefreshToken: Refresh Token invalid');
            return res.status(403).json({ error: 'Refresh Token invalid' });
         } else {
            console.error('authentificateRefreshToken: Unexpected error', error);
            return res.status(500).json({ error });
         }
      }
   } else {
      console.error('authentificateRefreshToken: No token received');
      return res.status(401).json({ error: 'No Refresh Token received.' });
   }
}
