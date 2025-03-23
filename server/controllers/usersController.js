// functions
import {
   getAllUsersData,
   deleteFavoriteGame,
   insertFavoriteGame,
   insertFavGameSetting,
   getUserFavoriteGames,
   getUserFavGameDetails,
   getUserFavGameSettings,
} from '../db/mysql.js';
import {
   insertFriend,
   getUserFriends,
   getUserNonFriends,
   insertFriendRequest,
   deleteFriendRequest,
   getUserFriendRequests,
} from '../models/friends.model.js';

/** Respond to request on users/me by providing users data of user identified by token */
export async function userInfo(req, res) {
   res.status(200).json({
      id: req.userData.id,
      username: req.userData.username,
      email: req.userData.email,
   });
   console.log('/users/me: User info provided succesfuly (200 OK)');
}

export async function sendAllUsersInfo(req, res) {
   try {
      const r = await getAllUsersData();

      console.log('/users: sent favorite games (200 OK)');
      return res.status(200).json({ success: true, data: r });
   } catch (err) {
      console.error('/users: Unexpected error:', err);
      return res.status(500).json({ success: false, error: err });
   }
}

//***===== FAV GAMES =====***//

/** Add a game to the list of favorite games of a user */
export async function addFavoriteGame(req, res) {
   const gameId = req.body.gameId;
   const userId = req.userData.id;

   const r = await insertFavoriteGame(gameId, userId);

   if (r) {
      console.log('/users/games/add: added favorite game (200 OK)');
      return res.status(200).json({ success: true });
   } else {
      return res
         .status(500)
         .json({ error: `insertFavoriteGame: failed to add favorite game to db` });
   }
}

/** Remove a game from the favorite */
export async function removeFavoriteGame(req, res) {
   const gameId = req.body.gameId;
   const userId = req.userData.id;

   const r = await deleteFavoriteGame(gameId, userId);

   if (r) {
      console.log('/users/games/remove: removed favorite game (200 OK)');
      return res.status(200).json({ success: true });
   } else {
      return res.status(500).json({
         success: false,
         error: `removeFavoriteGame: failed to remove favorite game to db`,
      });
   }
}

/** Add a user's favorite games settings to database */
export async function addFavGameSetting(req, res) {
   const gameId = req.body.gameId;
   const userId = req.userData.id;
   const fieldName = req.body.fieldName;
   const fieldValue = req.body.fieldValue;

   try {
      const r = insertFavGameSetting(gameId, userId, fieldName, fieldValue);

      if (r) {
         console.log('/users/games/settings/add: added favorite game detail (200 OK)');
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

/** Provide favorite games ressources to client */
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
      console.log('/users/games: sent favorite games (200 OK)');
      return res.status(200).json(gamesArr);
   }
}

/** Provide favorite games ressources to client */
export async function sendFavoriteGamesDetailed(req, res) {
   const userId = req.userData.id;
   try {
      const r = await getUserFavGameDetails(userId);

      console.log(r);

      console.log('/users/games: sent favorite games (200 OK)');
      return res.status(200).json({ data: r });
   } catch (err) {
      console.error('/users/games: Unexpected error:', err);
      return res.status(500).json({ error: err });
   }
}

/** Provide a user's favorite games settings */
export async function sendFavGamesSettings(req, res) {
   const userId = req.userData.id;
   try {
      const r = await getUserFavGameSettings(userId);

      console.log('/users/games/settings: sent favorite games settings (200 OK)');
      return res.status(200).json({ data: r });
   } catch (err) {
      console.error('/users/games/settings: Unexpected error:', err);
      return res.status(500).json({ error: err });
   }
}

//***===== FRIENDS =====***//

/** Provide info about all friends of a user */
export async function sendFriendsInfo(req, res) {
   const userId = req.userData.id;
   try {
      const r = await getUserFriends(userId);

      console.log('/users/friends: sent friends info (200 OK)');
      return res.status(200).json({ success: true, data: r });
   } catch (err) {
      console.error('/users/friends: Unexpected error:', err);
      return res.status(500).json({ success: false, error: err });
   }
}

/** Send 3 random users who aren't friend of caller user */
export async function sendFriendSuggestions(req, res) {
   const userId = req.userData.id;

   try {
      const r = await getUserNonFriends(userId);

      if (r.length === 0) {
         return res.status(200).json({ success: true, data: [] });
      }

      r.sort(() => 0.5 - Math.random()); // Shuffle response array

      // Select the first 3 unique friends in shuffled array
      const suggestedFriends = r.slice(0, 3).map((user) => ({
         id: user.user_id,
         name: user.user_name,
      }));

      return res.status(200).json({ success: true, data: suggestedFriends });
   } catch (err) {
      console.error('sendFriendSuggestions: unexpected error:', err);
      return res.status(500).json({ success: false, error: err });
   }
}

/** Send all friends requests for caller user */
export async function sendFriendRequests(req, res) {
   const userId = req.userData.id;

   try {
      const r = await getUserFriendRequests(userId);

      if (r.length === 0) {
         return res.status(200).json({ success: true, data: [] });
      }

      return res.status(200).json({ success: true, data: r });
   } catch (err) {
      console.error('sendFriendRequests: unexpected error:', err);
      return res.status(500).json({ success: false, error: err });
   }
}

/** Create friend request */
export async function addFriendRequest(req, res) {
   const friendId = req.body.friendId;
   const userId = req.userData.id;

   try {
      const r = insertFriendRequest(userId, friendId);

      if (r) {
         console.log('/users/games/friends/add: added friend (200 OK)');
         return res.status(200).json({ success: true });
      } else {
         return res
            .status(500)
            .json({ success: false, error: `addFriendRequest: failed to add friend` });
      }
   } catch (err) {
      console.log('addFriendRequest: Error when inserting friend to db:', err);
      return res.status(500).json({ success: false, error: err });
   }
}

/** Accept friend request */
export async function acceptFriendRequest(req, res) {
   const friendId = req.body.friendId;
   const userId = req.userData.id;

   try {
      const r = insertFriend(userId, friendId);

      if (r) {
         console.log('/users/games/friends/accept: accepted friend request(200 OK)');
         return res.status(200).json({ success: true });
      } else {
         return res.status(500).json({
            success: false,
            error: `acceptFriendRequest: failed to accept friend request`,
         });
      }
   } catch (err) {
      console.log('acceptFriendRequest: Error when accepting friend request:', err);
      return res.status(500).json({ success: false, error: err });
   }
}

/** Delete friend request */
export async function delFriendRequest(req, res) {
   const friendId = req.body.friendId;
   const userId = req.userData.id;

   try {
      const r = deleteFriendRequest(userId, friendId);

      if (r) {
         console.log('/users/games/friends/delete: deleted friend (200 OK)');
         return res.status(200).json({ success: true });
      } else {
         return res.status(500).json({
            success: false,
            error: `deleteFriendRequest: failed to delete friend request`,
         });
      }
   } catch (err) {
      console.log('deleteFriendRequest: Error when deleting friend request:', err);
      return res.status(500).json({ success: false, error: err });
   }
}
