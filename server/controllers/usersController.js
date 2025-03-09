// **** IMPORT ****

// Functions
import { deleteUserTokenDb } from '../db/mysql.js';

// **** FUNCTIONS ****

// Respond to request on users/me by providing users data of user identified by token
export async function userInfo(req, res) {
   res.status(200).json({
      id: req.userData.id,
      username: req.userData.username,
      email: req.userData.email,
   });
   console.log('User info provided succesfuly');
}

// Logout user by deleting tokens in cookies and token in db
export async function logoutUser(req, res) {
   try {
      // Delete refresh token from db
      await deleteUserTokenDb(req.userData.id);

      // Delete refresh and access tokens from client
      res.clearCookie('accessToken', {
         httpOnly: true,
         secure: true,
         sameSite: 'none',
         domain: 'gameverse.local',
      });
      res.clearCookie('refreshToken', {
         httpOnly: true,
         secure: true,
         sameSite: 'none',
         domain: 'gameverse.local',
      });

      res.sendStatus(200);
      console.log('/users/refresh-token: New access token sent (200 OK)');
   } catch (error) {
      console.error('logoutUser: Logout error: ', error);
      return res.status(500).json({ error: `Unexpected error during logout: ${error}` });
   }
}
