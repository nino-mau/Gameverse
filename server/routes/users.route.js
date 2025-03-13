/*==============================
===========  IMPORTS  ==========
===============================*/

import Express from 'express';

// functions
import { userLogin } from '../controllers/authController.js';
import { userInfo } from '../controllers/usersController.js';
import { logoutUser } from '../controllers/usersController.js';
import { userRegistration } from '../controllers/authController.js';
import { addFavoriteGame } from '../controllers/usersController.js';
import { sendFavoriteGames } from '../controllers/usersController.js';
import { authentificateAccessToken } from '../middlewares/middlewares.js';
import { authentificateRefreshToken } from '../middlewares/middlewares.js';

/*==============================
============  MAIN  ============
===============================*/

const router = Express.Router();

//***===== AUTH =====***//

// Define endpoint for receiving register form data
router.post('/users/register', userRegistration);

// Define endpoint for receiving register form data
router.post('/users/login', userLogin);

// Define endpoint for client to logout
router.post('/users/logout', authentificateAccessToken, logoutUser);

// Define endpoint for client to verify JWT token validity
router.post('/users/access-token', authentificateAccessToken, (req, res) => {
   res.sendStatus(200);
   console.log('/users/access-token: JWT token validity check successful (200 OK)');
});

// Define endpoint for client to get a new access token with refresh token
router.post('/users/refresh-token', authentificateRefreshToken, (req, res) => {
   res.sendStatus(200);
   console.log('/users/refresh-token: New access token sent (200 OK)');
});

//***===== DATA =====***//

// Define ressource of the infos of current user
router.get('/users/me', authentificateAccessToken, userInfo);

// Define endpoint to add favorite game to user
router.post('/users/add-favorite-game', authentificateAccessToken, addFavoriteGame);

// Define ressource of the favorite games of current user
router.get('/users/favorite-games', authentificateAccessToken, sendFavoriteGames);

export default router;
