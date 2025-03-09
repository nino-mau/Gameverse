// **** IMPORTS ****

// Import dependencies
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// **** FUNCTIONS ****

// Connection pool
const pool = mysql.createPool({
   host: 'localhost', // Replace with your MySQL host
   user: 'nino', // Replace with your MySQL user
   password: 'C0sezok?92', // Replace with your MySQL password
   database: 'gameverse', // Replace with your database name
   connectionLimit: 10, // Adjust connection limit as needed (e.g., based on expected concurrency)
});

// *** INSERTS ***

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
export async function insertGamesNames(gamesArr) {
   const values = gamesArr.map((obj) => [obj.name]);
   const sql = `INSERT INTO games (game_name) VALUES ?`;
   insertInDb(sql, values);
}

// Insert games genre and the corresponding games id in the games_genre table
export async function insertGamesGenres(gamesArr) {
   let namesGenresArr = [];

   // Create an array of game -> genre objects to use for the sql query
   gamesArr.forEach((game, id) => {
      const genres = game.genres;
      genres.forEach((genre) => {
         const Obj = new Object();
         Obj[id + 1] = genre;
         namesGenresArr.push(Obj);
         delete Obj.name;
      });
   });

   const values = namesGenresArr.map((obj) => [Object.keys(obj), Object.values(obj)]);
   const sql = `INSERT INTO games_genre (game_id, game_genre) VALUES ?`;
   insertInDb(sql, values);
}

// Insert games platforms and the corresponding games id in the games_genre table
export async function insertGamesPlatforms(gamesArr) {
   let namesPlatformsArr = [];

   // Create an array of game -> genre objects to use for the sql query
   gamesArr.forEach((game, id) => {
      const platforms = game.platforms;
      platforms.forEach((platform) => {
         const Obj = new Object();
         Obj[id + 1] = platform;
         namesPlatformsArr.push(Obj);
         delete Obj.name;
      });
   });

   const values = namesPlatformsArr.map((obj) => [Object.keys(obj), Object.values(obj)]);
   const sql = `INSERT INTO games_platforms (game_id, game_platform) VALUES ?`;
   insertInDb(sql, values);
}

// Insert desc, price and review in the games_details table
export async function insertGamesDetails(gamesArr) {
   const values = gamesArr.map((obj, index) => [
      index + 1,
      obj.description,
      obj.user_rating,
      obj.price,
   ]);
   const sql = `INSERT INTO games_details (game_id, game_description, game_review, game_price) VALUES ?`;
   insertInDb(sql, values);
}

// Put refresh token (id, expire date) in DB, will be used to create JWT token sent to frontend and verify it or revoke it after that
export async function createRefreshTokenDb(userData) {
   const tokenId = uuidv4();

   const tokenDuration = userData.rememberMe
      ? process.env.REFRESH_TOKEN_LONG
      : process.env.REFRESH_TOKEN_SHORT;

   console.log(tokenDuration);

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

// *** SELECTS ***

// Take a select query and execute it
async function selectInDb(query, value) {
   let connection;

   try {
      connection = await pool.getConnection();

      const [rows] = await connection.query(query, value);

      const results = rows;
      console.log('Query results:', results);

      if (results.length === 1) {
         return results[0];
      }

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
   const r = selectInDb(sql);
   return r;
}

// Extract data of one user identified by username
export async function getUserData(username) {
   const sql = `SELECT user_id, user_name, user_email, user_password FROM users WHERE user_name = ?`;
   const r = selectInDb(sql, username);

   if (r) {
      return r;
   } else {
      console.log('User not found in database');
      return false;
   }
}

// Extract data of one user identified by id
export async function getUserDataById(userId) {
   const sql = `SELECT user_id, user_name, user_email FROM users WHERE user_id = ?`;
   const r = selectInDb(sql, userId);

   if (r) {
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
      return r;
   } else {
      console.log('getRefreshTokenInf: Refresh token not found in database');
      return false;
   }
}

// *** AUTHENTIFICATION ***

// Register user in db
export async function registerUserDb(userData) {
   try {
      // Encrypt password before storing
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.pwd, saltRounds);

      const values = [userData.username, userData.email, hashedPassword];
      const sql = `INSERT INTO users (user_name, user_email, user_password) VALUES (?)`;

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
