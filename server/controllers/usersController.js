// functions
import {
   deleteUserTokenDb,
   deleteFavoriteGame,
   insertFavoriteGame,
   insertFavGameSetting,
   getUserFavoriteGames,
   getUserFavGameDetails,
   getUserFavGameSettings,
} from '../db/mysql.js';

/*==============================
==========  FUNCTIONS  =========
===============================*/

//***===== AUTH =====***//

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

//***===== Fav Games =====***//

// Add a game to the list of favorite games of a user
export async function addFavoriteGame(req, res) {
   const gameId = req.body.gameId;
   const userId = req.userData.id;

   const r = await insertFavoriteGame(gameId, userId);

   if (r) {
      console.log('/users/add-favorite-game: added favorite game (200 OK)');
      return res.status(200).json({ success: true });
   } else {
      return res
         .status(500)
         .json({ error: `insertFavoriteGame: failed to add favorite game to db` });
   }
}

// Remove a game from the favorite
export async function removeFavoriteGame(req, res) {
   const gameId = req.body.gameId;
   const userId = req.userData.id;

   const r = await deleteFavoriteGame(gameId, userId);

   if (r) {
      console.log('/users/remove-favorite-game: removed favorite game (200 OK)');
      return res.status(200).json({ success: true });
   } else {
      return res
         .status(500)
         .json({
            success: false,
            error: `removeFavoriteGame: failed to remove favorite game to db`,
         });
   }
}

// Add a user's favorite games settings to database
export async function addFavGameSetting(req, res) {
   const gameId = req.body.gameId;
   const userId = req.userData.id;
   const fieldName = req.body.fieldName;
   const fieldValue = req.body.fieldValue;

   console.log(fieldValue);
   console.log(fieldName);
   console.log('test');

   try {
      const r = insertFavGameSetting(gameId, userId, fieldName, fieldValue);

      if (r) {
         console.log('/users/add-favorite-game-setting: added favorite game detail (200 OK)');
         return res.status(200).json({ success: true });
      } else {
         return res
            .status(500)
            .json({ error: `addFavGameSetting: failed to add favorite game to db` });
      }
   } catch (err) {
      console.log('addFavGameSetting: Error when inserting game detail:', err);
      return res.status(500).json({ error: err });
   }
}

// Provide favorite games ressources to client
export async function sendFavoriteGames(req, res) {
   const userId = req.userData.id;

   const r = await getUserFavoriteGames(userId);

   if (!r.length) {
      res.status(200).json([]);
   } else {
      const gamesArr = [];
      r.forEach((obj) => {
         gamesArr.push(obj.game_id);
      });
      console.log('/users/favorite_games: sent favorite games (200 OK)');
      return res.status(200).json(gamesArr);
   }
}

// Provide favorite games ressources to client
export async function sendFavoriteGamesDetailed(req, res) {
   const userId = req.userData.id;
   try {
      const r = await getUserFavGameDetails(userId);

      console.log('/users/favorite_games: sent favorite games (200 OK)');
      return res.status(200).json({ data: r });
   } catch (err) {
      console.error('/users/favorite_games: Unexpected error:', err);
      return res.status(500).json({ error: err });
   }
}

// Provide a user's favorite games settings
export async function sendFavGamesSettings(req, res) {
   const userId = req.userData.id;
   try {
      const r = await getUserFavGameSettings(userId);

      console.log('/users/favorite_games_settings: sent favorite games settings (200 OK)');
      return res.status(200).json({ data: r });
   } catch (err) {
      console.error('/users/favorite_games_settings: Unexpected error:', err);
      return res.status(500).json({ error: err });
   }
}
