import Express from 'express';

// functions
import {
   removeFavoriteGame,
   userInfo,
   logoutUser,
   addFavoriteGame,
   addFavGameSetting,
   sendFavoriteGames,
   sendFavGamesSettings,
   sendFavoriteGamesDetailed,
} from '../controllers/usersController.js';
import { userLogin, userRegistration } from '../controllers/authController.js';
import {
   authentificateAccessToken,
   authentificateRefreshToken,
   typeCheckGameSetting,
} from '../middlewares/middlewares.js';

/*==============================
============  MAIN  ============
===============================*/

const router = Express.Router();

//***===== AUTH =====***//

// Handle user registration (unprotected)
router.post('/users/register', userRegistration);

// Handle user login (unprotected)
router.post('/users/login', userLogin);

// Handle logout
router.post('/users/logout', authentificateAccessToken, logoutUser);

// Verify access token
router.post('/users/access-token', authentificateAccessToken, (req, res) => {
   res.sendStatus(200);
   console.log('/users/access-token: JWT token validity check successful (200 OK)');
});

// Handle sending refresh token
router.post('/users/refresh-token', authentificateRefreshToken, (req, res) => {
   res.sendStatus(200);
   console.log('/users/refresh-token: New access token sent (200 OK)');
});

// Send users auth info
router.get('/users/me', authentificateAccessToken, userInfo);

//***===== USER DATA =====***//

// Add a game to favorite
router.post('/users/add-favorite-game', authentificateAccessToken, addFavoriteGame);

// Remove a game from favorite
router.post('/users/remove-favorite-game', authentificateAccessToken, removeFavoriteGame);

// Send favorite games informations
router.get('/users/favorite-games', authentificateAccessToken, (req, res) => {
   const { details } = req.query;
   if (details === 'true') {
      sendFavoriteGamesDetailed(req, res);
   } else {
      sendFavoriteGames(req, res);
   }
});

// Send favorite games settings informations (hours played, completion, rank...)
router.get('/users/favorite-games-settings', authentificateAccessToken, sendFavGamesSettings);

// Add or modify a fav game setting
router.post(
   '/users/add-favorite-game-setting',
   authentificateAccessToken,
   typeCheckGameSetting,
   addFavGameSetting,
);

export default router;
