import Express from 'express';

// functions
import {
   userInfo,
   sendFriendsInfo,
   addFavoriteGame,
   addFriendRequest,
   sendAllUsersInfo,
   delFriendRequest,
   addFavGameSetting,
   sendFavoriteGames,
   removeFavoriteGame,
   sendFriendRequests,
   acceptFriendRequest,
   sendFavGamesSettings,
   sendFriendSuggestions,
   sendFavoriteGamesDetailed,
} from '../controllers/usersController.js';
import { authentificateAccessToken, typeCheckGameSetting } from '../middlewares/middlewares.js';

const router = Express.Router();

//***===== Routes =====***//

// Send info about one user
router.get('/users/me', authentificateAccessToken, userInfo);

// Send info about all users
router.get('/users', sendAllUsersInfo);

// GAMES

// Add a game to favorite
router.post('/users/games/add', authentificateAccessToken, addFavoriteGame);

// Remove a game from favorite
router.post('/users/games/remove', authentificateAccessToken, removeFavoriteGame);

// Provide favorite games informations
router.get('/users/games', authentificateAccessToken, (req, res) => {
   const { details } = req.query;
   console.log('details: ', details);
   if (details === 'true') {
      sendFavoriteGamesDetailed(req, res);
   } else {
      sendFavoriteGames(req, res);
   }
});

// Provide favorite games settings informations (hours played, completion, rank...)
router.get('/users/games/settings', authentificateAccessToken, sendFavGamesSettings);

// Add or modify a fav game setting
router.post(
   '/users/games/settings/add',
   authentificateAccessToken,
   typeCheckGameSetting,
   addFavGameSetting,
);

// FRIENDS

// Provide info about all friends of current user
router.get('/users/friends', authentificateAccessToken, sendFriendsInfo);

// Provide a set number of friends suggestions for a user
router.get('/users/friends/suggestions', authentificateAccessToken, sendFriendSuggestions);

// Send a friend request
router.get('/users/friends/requests', authentificateAccessToken, sendFriendRequests);

// Add a friend request
router.post('/users/friends/add', authentificateAccessToken, addFriendRequest);

// Accept a friend request
router.post('/users/friends/accept', authentificateAccessToken, acceptFriendRequest);

// Delete friend request
router.post('/users/friends/delete', authentificateAccessToken, delFriendRequest);

export default router;
