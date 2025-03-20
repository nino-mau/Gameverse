import Express from 'express';

// functions
import {
   userInfo,
   addFriend,
   addFavoriteGame,
   addFavGameSetting,
   sendFavoriteGames,
   removeFavoriteGame,
   sendFavGamesSettings,
   sendFavoriteGamesDetailed,
} from '../controllers/usersController.js';
import { authentificateAccessToken, typeCheckGameSetting } from '../middlewares/middlewares.js';

const router = Express.Router();

//***===== Routes =====***//

// Send users info
router.get('/users/me', authentificateAccessToken, userInfo);

// GAMES

// Add a game to favorite
router.post('/users/games/add', authentificateAccessToken, addFavoriteGame);

// Remove a game from favorite
router.post('/users/games/remove', authentificateAccessToken, removeFavoriteGame);

// Send favorite games informations
router.get('/users/games', authentificateAccessToken, (req, res) => {
   const { details } = req.query;
   console.log('details: ', details);
   if (details === 'true') {
      sendFavoriteGamesDetailed(req, res);
   } else {
      sendFavoriteGames(req, res);
   }
});

// Send favorite games settings informations (hours played, completion, rank...)
router.get('/users/games/settings', authentificateAccessToken, sendFavGamesSettings);

// Add or modify a fav game setting
router.post(
   '/users/games/settings/add',
   authentificateAccessToken,
   typeCheckGameSetting,
   addFavGameSetting,
);

// FRIENDS

// Add a friend
router.post('/users/friends/add', authentificateAccessToken, addFriend);

export default router;
