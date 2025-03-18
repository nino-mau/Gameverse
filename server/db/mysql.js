/*==============================
===========  IMPORTS  ==========
===============================*/

// dependencies
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import { jsonToObject } from '../utils/utils';
// import { jsonToObject } from '../utils/utils.js';

/*==============================
==========  FUNCTIONS  =========
===============================*/

// Connection pool
const pool = mysql.createPool({
   host: 'localhost', // Replace with your MySQL host
   user: 'nino', // Replace with your MySQL user
   password: 't9HZ9S4nPE5H9!!hx7kIKLv5B3l@@a03MOdZk!', // Replace with your MySQL password
   database: 'gameverse', // Replace with your database name
   connectionLimit: 10, // Adjust connection limit as needed (e.g., based on expected concurrency)
});

export const gameImgArr = [
   'header-0.webp',
   'header-1.webp',
   'header-10-1741682833647.webp',
   'header-11-1741682833647.webp',
   'header-12-1741682833647.webp',
   'header-13-1741682833648.webp',
   'header-14-1741682833648.webp',
   'header-15.webp',
   'header-16-1741682833649.webp',
   'header-17-1741682833649.webp',
   'header-18-1741682833649.webp',
   'header-19-1741682833650.webp',
   'header-2.webp',
   'header-20-1741682833650.webp',
   'header-21-1741682833650.webp',
   'header-22-1741682833651.webp',
   'header-23-1741682833651.webp',
   'header-24-1741682833651.webp',
   'header-25-1741682833652.webp',
   'header-26-1741682833652.webp',
   'header-27-1741682833652.webp',
   'header-28-1741682833653.webp',
   'header-29.webp',
   'header-3.webp',
   'header-30-1741682833653.webp',
   'header-31-1741682833653.webp',
   'header-32-1741682833654.webp',
   'header-33-1741682833654.webp',
   'header-34-1741682833654.webp',
   'header-35-1741682833655.webp',
   'header-36-1741682833655.webp',
   'header-37-1741682833655.webp',
   'header-38.webp',
   'header-39-1741682833656.webp',
   'header-4.webp',
   'header-40-1741682833656.webp',
   'header-41-1741682833657.webp',
   'header-42-1741682833657.webp',
   'header-43-1741682833657.webp',
   'header-44-1741682833658.webp',
   'header-45-1741682833658.webp',
   'header-46-1741682833658.webp',
   'header-47-1741682833658.webp',
   'header-48-1741682833659.webp',
   'header-49-1741682833659.webp',
   'header-6.webp',
   'header-7.webp',
   'header-8.webp',
   'header-9-1741682833646.webp',
];

const gamesArr = jsonToObject('steam-games.json');

await insertGameGenres(gamesArr);

//***===== INSERT =====***//

// Take an insert query with values and execute it
async function insertInDb(query, values) {
   let connection;

   try {
      connection = await pool.getConnection();
      const [insertResult] = await connection.query(query, values);

      console.log('Insert Result:', insertResult);
      console.log('Affected rows:', insertResult.affectedRows);
      console.log('Inserted ID:', insertResult.insertId);

      return insertResult;
   } catch (error) {
      console.error('Error inserting data:', error);
      throw error;
   } finally {
      if (connection) connection.release();
   }
}

// Insert an array of games names into the games table
export async function insertGameNames(gamesArr) {
   const values = gamesArr.map((obj) => [obj.name]);
   const sql = `INSERT INTO games (name) VALUES ?`;
   insertInDb(sql, [values]);
}

// Insert games genre and the corresponding games id in the games_genre table
export async function insertGameGenres(gamesArr, initialId = 1) {
   let values = [];

   // Create array of [game_id, genre] pairs
   gamesArr.forEach((game, index) => {
      const gameId = index + initialId; // Game IDs start at 1
      game.genres.forEach((genre) => {
         values.push([gameId, genre]);
      });
   });

   const sql = `INSERT INTO game_genres (game_id, genre) VALUES ?`;
   insertInDb(sql, [values]);
}

// Insert games platforms and the corresponding games id in the games_genre table
export async function insertGameDevelopers(gamesArr, initialId = 1) {
   let namesDevelopersArr = [];

   // Create an array of game -> developer objects to use for the sql query
   gamesArr.forEach((game, id) => {
      const developers = game.developers;
      developers.forEach((developer) => {
         const obj = {};
         obj[id + initialId] = developer;
         namesDevelopersArr.push(obj);
      });
   });

   const values = namesDevelopersArr.map((obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      return [parseInt(key), value];
   });
   const sql = `INSERT INTO game_developers (game_id, developer) VALUES ?`;
   insertInDb(sql, [values]);
}

// Insert desc, price and review and image names in the games_details table
export async function insertGameDetails(gamesArr, gameImgArr, initialId = 1) {
   const sortedArr = gameImgArr.sort((a, b) => {
      const numA = parseInt(a.match(/header-(\d+)/)[1]);
      const numB = parseInt(b.match(/header-(\d+)/)[1]);
      return numA - numB;
   });

   const values = gamesArr.map((obj, index) => [
      index + initialId,
      obj.description,
      obj.steam_review.score,
      obj.price,
   ]);

   values.forEach((item) => {
      item.push(sortedArr[values.indexOf(item)]);
   });
   console.log(values);

   const sql = `INSERT INTO game_details (game_id, description, review_score, price, image_name) VALUES ?`;

   insertInDb(sql, [values]);
}

// Put refresh token (id, expire date) in DB, will be used to create JWT token sent to frontend and verify it or revoke it after that
export async function createRefreshTokenDb(userData) {
   const tokenId = uuidv4();

   const tokenDuration = userData.staySignedIn
      ? process.env.REFRESH_TOKEN_LONG
      : process.env.REFRESH_TOKEN_SHORT;

   const sql = `
      INSERT INTO refresh_tokens (user_id, token_id) 
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE 
         token_id = VALUES(token_id)
   `;
   const values = [userData.id, tokenId];

   const r = await insertInDb(sql, values);

   if (r.affectedRows > 0) {
      console.log('createRefreshTokenDb: Succesfuly inserted token id in db');
      return { duration: tokenDuration, tokenId: tokenId };
   } else {
      console.log('createRefreshTokenDb: Creating refresh token row in db failed');
      return false;
   }
}

// Insert user id and game id in user_favorite_games table
export async function insertFavoriteGame(gameId, userId) {
   // Check if game isn't already in favorite
   const sqlSelect = `SELECT * FROM user_favorite_games WHERE user_id = ? AND game_id = ?`;
   const valuesSelect = [userId, gameId];
   const r1 = await selectInDb(sqlSelect, valuesSelect);
   console.log(r1);

   if (!r1.length) {
      const sqlInsert = `INSERT INTO user_favorite_games (user_id, game_id) VALUES (? , ?)`;
      const valuesInsert = [userId, gameId];

      const r2 = await insertInDb(sqlInsert, valuesInsert);

      if (r2.affectedRows > 0) {
         return true;
      } else {
         console.log('insertFavoriteGame: failed inserting favorite game');
         return false;
      }
   } else {
      console.log('insertFavoriteGame: game is already in favorite for this user');
      return false;
   }
}

// Used to add value to favorite games table
export async function insertFavGameSetting(gameId, userId, fieldName, fieldValue) {
   // Escape the field name with backticks to handle reserved keywords
   const escapedFieldName = `\`${fieldName}\``;

   const sql = `UPDATE user_favorite_games 
         SET ${escapedFieldName} = ?
         WHERE game_id = ? AND user_id = ?`;
   const values = [fieldValue, gameId, userId];

   const r = await insertInDb(sql, values);

   if (r.affectedRows > 0) {
      console.log(`insertFavGameSetting: Successfully updated fav game detail`);
      return true;
   }

   console.log(`insertFavGameSetting: Failed to update fav game detail`);
   return false;
}

//***===== SELECT =====***//

// Take a select query, execute it, handle error and return result
async function selectInDb(query, value) {
   let connection;

   try {
      connection = await pool.getConnection();

      const [rows] = await connection.query(query, value);

      const results = rows;
      console.log('Query results:', results);

      return results;
   } catch (error) {
      console.error('Error selecting data:', error);
      throw error;
   } finally {
      if (connection) connection.release();
   }
}

// extract all usersnames and emails from the user table
export async function getAuthData() {
   const sql = `SELECT user_name, user_email FROM users`;
   const r = await selectInDb(sql);
   if (r.length === 1) {
      return r[0];
   }
   return r;
}

// Extract data of one user identified by username
export async function getUserData(username) {
   const sql = `SELECT user_id, user_name, user_email, user_password FROM users WHERE user_name = ?`;
   const r = await selectInDb(sql, username);
   console.log(r[0]);
   if (r) {
      if (r.length === 1) {
         return r[0];
      }
      return r;
   } else {
      console.log('User not found in database');
      return false;
   }
}

// Extract data of one user identified by id
export async function getUserDataById(userId) {
   const sql = `SELECT user_id, user_name, user_email FROM users WHERE user_id = ?`;
   const r = await selectInDb(sql, userId);

   if (r) {
      if (r.length === 1) {
         return r[0];
      }
      return r;
   } else {
      console.log('User not found in database');
      return false;
   }
}

// Extract token id from the corresponding user id in refresh token table
export async function getRefreshTokenInfo(userId) {
   const sql = `SELECT token_id FROM refresh_tokens WHERE user_id = ?`;
   const r = await selectInDb(sql, userId);

   if (r) {
      if (r.length === 1) {
         return r[0];
      }
      return r;
   } else {
      console.log('getRefreshTokenInf: Refresh token not found in database');
      return false;
   }
}

// Extract data about games stored in db
export async function getGameDetails() {
   const sql = `SELECT g.game_id, g.name, gd.review_score, gd.image_name FROM games g, game_details gd WHERE g.game_id = gd.game_id`;
   const r = await selectInDb(sql);
   if (r.length === 1) {
      return r[0];
   }
   return r;
}

// Extract game_genres table from database
export async function getGameGenres() {
   const sql = `SELECT * FROM game_genres`;
   const r = await selectInDb(sql);
   if (r.length === 1) {
      return r[0];
   }
   return r;
}

// Extract basic informations about a user's favorites games
export async function getUserFavoriteGames(userId) {
   const sql = `SELECT game_id FROM user_favorite_games WHERE user_id = ?`;
   const value = userId;

   const r = await selectInDb(sql, value);
   return r;
}

// Extract detailed informations about a user's favorites games
export async function getUserFavGameDetails(userId) {
   const favGames = await getUserFavoriteGames(userId);

   if (!favGames || favGames.length === 0) {
      console.log('getUserFavGameDetails: No favorite games found for this user');
      return [];
   }

   // Extract game IDs from the result array
   const gameIds = favGames.map((game) => game.game_id);

   // get details for these games
   const sql = `
      SELECT g.name, g.game_id, gd.image_name, gd.ranks 
      FROM games g 
      INNER JOIN game_details gd ON g.game_id = gd.game_id 
      WHERE g.game_id IN (?)
   `;

   const r = await selectInDb(sql, [gameIds]);
   return r;
}

// Extract the settings of a user's favorite games
export async function getUserFavGameSettings(userId) {
   const sql = `SELECT * FROM user_favorite_games WHERE user_id = ?`;
   const value = userId;

   const r = await selectInDb(sql, value);
   if (!r || r.length === 0) {
      console.log('getUserFavGameSettings: No favorite games found for this user');
      return [];
   }
   return r;
}

//***===== DELETE =====***//

// Reusable function to delete values from db
async function deleteFromDb(sql, values) {
   let connection;

   try {
      connection = await pool.getConnection();

      const [result] = await connection.query(sql, values);

      console.log('Delete Result:', result);
      console.log('Affected rows:', result.affectedRows);
      console.log('Inserted ID:', result.insertId);

      return result;
   } catch (error) {
      console.error('deleteFromDb: Error deleting data:', error);
      return false;
   } finally {
      if (connection) connection.release();
   }
}

// Delete the refresh token corresponding to an user id in database
export async function deleteUserTokenDb(userId) {
   let connection;

   try {
      connection = await pool.getConnection();

      const sql = `DELETE FROM refresh_tokens WHERE user_id = ?`;
      const value = userId;

      const [result] = await connection.query(sql, value);

      console.log('Delete Result:', result);
      console.log('Affected rows:', result.affectedRows);
      console.log('Inserted ID:', result.insertId);
   } catch (error) {
      console.error('deleteUserTokenDb: Error deleting data:', error);
      return false;
   } finally {
      if (connection) connection.release();
   }
}

// Delete a favorite game from user_favorite_games
export async function deleteFavoriteGame(gameId, userId) {
   const sql = `DELETE FROM user_favorite_games WHERE user_id = ? AND game_id = ?`;
   const values = [userId, gameId];

   const r = await deleteFromDb(sql, values);

   if (r.affectedRows > 0) {
      return true;
   } else {
      console.error('deleteFavoriteGame: failed inserting favorite game');
      return false;
   }
}

//***===== AUTH =====***//

// Register user in db
export async function registerUserDb(userData) {
   try {
      // Encrypt password before storing
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.pwd, saltRounds);

      const values = [userData.username, userData.email, hashedPassword];
      const sql = `INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)`;

      const result = await insertInDb(sql, values);
      if (result.affectedRows > 0) {
         return {
            success: true,
            id: result.insertId,
         };
      } else {
         return false;
      }
   } catch (error) {
      console.error('Failed to register user:', error);
      return false;
   }
}
