// **** IMPORTS ****

// Dependencies
import bcrypt from 'bcrypt';
import ms from 'ms';

// Functions
import { getAuthData } from '../db/mysql.js';
import { getUserData } from '../db/mysql.js';
import { registerUserDb } from '../db/mysql.js';
import { createRefreshTokenDb } from '../db/mysql.js';
import { isValidEmailFormat } from '../utils/utils.js';
import { generateUserAccessToken } from '../utils/utils.js';
import { generateUserRefreshToken } from '../utils/utils.js';

// **** REGISTER ****

// Handle receiving posted register data, validating it and registering user in db
export async function userRegistration(req, res) {
   try {
      const userData = {
         id: null,
         username: req.body.username,
         email: req.body.email,
         staySignedIn: false, // False by default on register
         pwd: req.body.password,
         confirmPwd: req.body.confirmPassword,
      };

      // Error object to send back to frontend if data isn't valid
      const errors = {
         syntax: undefined,
         duplicate: undefined,
      };

      // Check if user data syntax is valid and if user data doesn't already exist in db
      const syntaxErr = _isSyntaxValid(userData);
      const duplicateErr = await _isUserInfoValid(userData);

      // When check do not return errors register user, else send back errors object
      if (syntaxErr === null && duplicateErr === null) {
         const r = await registerUserDb(userData);

         if (r.success === true) {
            // Store user id
            userData.id = r.id;

            // Create a refresh token id to be stored in db and used to create JWT refresh token
            const r2 = await createRefreshTokenDb(userData);

            // Create an access and refresh token for the user
            const accessToken = await generateUserAccessToken(userData);
            const refreshToken = await generateUserRefreshToken(userData, r2.tokenId, r2.duration);

            // Configure cookie for access token
            const accessTokenCookie = {
               httpOnly: true,
               secure: true, // True (https) when in production and false (http) when in dev
               sameSite: 'none',
               domain: 'gameverse.local',
               maxAge: ms(process.env.ACCESS_TOKEN_DURATION), // 15 m
            };
            const refreshTokenCookie = {
               httpOnly: true,
               secure: true, // True (https) when in production and false (http) when in dev
               sameSite: 'none',
               domain: 'gameverse.local',
               maxAge: ms(process.env.REFRESH_TOKEN_SHORT), // 1d
            };

            // Send cookies to client
            res.cookie('accessToken', accessToken, { ...accessTokenCookie });
            res.cookie('refreshToken', refreshToken, { ...refreshTokenCookie });

            res.status(200).json({
               data: {
                  id: r.id,
               },
               message: 'User registration successful',
            });
            console.log('userRegistration: User registration successful');
         } else {
            res.status(500).json({
               error: 'User registration unsuccessful',
            });
            console.error('userRegistration: User registration process unsucessful');
         }
      } else {
         errors.syntax = syntaxErr;
         errors.duplicate = duplicateErr;
         res.status(409).json({ error: errors });
         console.error('userRegistration: User registration unsucessful', errors);
      }
   } catch (error) {
      console.error('userRegistration: Register process failed:', error);
      res.status(500).json({ error: `Register process failed: ${error}` });
   }
}

// Private function to check if submited user data syntax is valid
function _isSyntaxValid(data) {
   const validations = {
      username: data.username.length >= 3,
      password: data.pwd.length >= 5,
      email: isValidEmailFormat(data.email),
      passwordsMatch: data.confirmPwd === data.pwd,
   };

   if (Object.values(validations).includes(false)) {
      return { error: 'Syntax error' };
   } else {
      return null;
   }
}

// Private function to check if submited user data does not already exist  in db
async function _isUserInfoValid(data) {
   let isUsernameAvailable = true;
   let isEmailAvailable = true;

   // Get relevant auth data from database
   try {
      const authData = await getAuthData();
      authData.forEach((userDb) => {
         if (data.username === userDb.user_name) {
            isUsernameAvailable = false;
         }
         if (data.email === userDb.user_email) {
            isEmailAvailable = false;
         }
      });
   } catch (error) {
      console.error('getAuthData Failed', error);
   }

   if (!isUsernameAvailable && !isEmailAvailable) {
      return {
         type: 'both',
         errorUsername: "Username isn't available",
         errorEmail: "Email isn't available",
         emailValue: data.email,
         usernameValue: data.username,
      };
   } else if (!isEmailAvailable) {
      return {
         type: 'email',
         errorEmail: "Email isn't available",
         emailValue: data.email,
      };
   } else if (!isUsernameAvailable) {
      return {
         type: 'username',
         errorUsername: "Username isn't available",
         usernameValue: data.username,
      };
   } else {
      return null;
   }
}

// **** LOGIN ****

// Handle loging in the user with a access/refresh token method
export async function userLogin(req, res) {
   try {
      const userData = {
         id: null,
         username: req.body.username,
         email: null,
         password: req.body.password,
         staySignedIn: req.body.staySignedIn,
      };

      const r = await _verifyLoginInfo(userData.username, userData.password);

      if (r) {
         // Take missing user data in db
         userData.id = r.user_id;
         userData.email = r.user_email;

         // Create a refresh token id to be stored in db and used to create JWT refresh token
         const r2 = await createRefreshTokenDb(userData);

         // Create an access and refresh token for the user
         const accessToken = await generateUserAccessToken(userData);
         const refreshToken = await generateUserRefreshToken(userData, r2.tokenId, r2.duration);

         // Configure cookie for access token
         const accessTokenCookie = {
            httpOnly: true,
            secure: true, // True (https) when in production and false (http) when in dev
            sameSite: 'none',
            domain: 'gameverse.local',
            maxAge: ms(process.env.ACCESS_TOKEN_DURATION), // 15 m
         };
         const refreshTokenCookie = {
            httpOnly: true,
            secure: true, // True (https) when in production and false (http) when in dev
            sameSite: 'none',
            domain: 'gameverse.local',
            maxAge: userData.staySignedIn
               ? ms(process.env.REFRESH_TOKEN_LONG)
               : ms(process.env.REFRESH_TOKEN_SHORT), // 1 or 15 days
         };

         // Send cookies to client
         res.cookie('accessToken', accessToken, { ...accessTokenCookie });
         res.cookie('refreshToken', refreshToken, { ...refreshTokenCookie });

         // Respond to client
         res.status(200).json({
            data: {
               id: userData.id,
            },
            message: 'User login successful',
         });
         console.log('userLogin: User login successful');
      } else {
         console.log('userLogin: Login informations are invalid');
         res.status(401).json({ error: 'Username or password invalid' });
      }
   } catch (error) {
      console.error('userLogin: Login process failed:', error);
      res.status(500).json({ error: `Login process failed: ${error}` });
   }
}

// Verify if username exist and if password match the one in the db
async function _verifyLoginInfo(username, password) {
   try {
      const dbUser = await getUserData(username);
      if (!dbUser) {
         console.log('_verifyLoginInfo: User not found in database');
         return false;
      } else {
         try {
            const isPwdValid = await bcrypt.compare(password, dbUser.user_password);
            if (isPwdValid) {
               console.log('_verifyLoginInfo: Passwords match');
               return dbUser;
            } else {
               console.error('_verifyLoginInfo: Passwords do not match');
               return false;
            }
         } catch (error) {
            console.error('_verifyLoginInfo: Problem with comparing process', error);
            return false;
         }
      }
   } catch (error) {
      console.error('_verifyLoginInfo: Unexpected error during login info verification', error);
      return false;
   }
}
