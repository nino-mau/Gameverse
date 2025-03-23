import { selectInDb } from '../utils/database.js';
import { pool } from '../db/pool.js';

/**
 * Select all users that aren't friends to specified user
 * and aren't subject to a friend request from specified user
 */
export async function getUserNonFriends(userId) {
   const sql = `SELECT user_id, user_name
                FROM users
                WHERE user_id NOT IN (
                  SELECT friend_id FROM user_friends WHERE user_id = ?
                )
                AND user_id NOT IN (
                  SELECT 
                    CASE 
                      WHEN user_id1 = ? THEN user_id2
                      WHEN user_id2 = ? THEN user_id1
                    END
                  FROM friend_requests
                  WHERE 
                    (user_id1 = ? AND requestor = 'user_id1') 
                    OR 
                    (user_id2 = ? AND requestor = 'user_id2')
                )
                AND user_id != ?;`;

   return await selectInDb(sql, [userId, userId, userId, userId, userId, userId]);
}

/**  Select friends of a specified user */
export async function getUserFriends(userId) {
   const sql = `SELECT u.user_id, u.user_name
                FROM users u
                INNER JOIN user_friends uf ON u.user_id = uf.friend_id
                WHERE uf.user_id = 34`;
   return await selectInDb(sql, [userId]);
}

/** Select friends requests and info linked to the requester that are to the specified user */
export async function getUserFriendRequests(userId) {
   const sql = `
    SELECT 
      CASE 
        WHEN user_id1 = ? THEN u2.user_id
        WHEN user_id2 = ? THEN u1.user_id
      END AS requester_id,
      CASE 
        WHEN user_id1 = ? THEN u2.user_name
        WHEN user_id2 = ? THEN u1.user_name
      END AS requester_name
    FROM friend_requests fr
    JOIN users u1 ON fr.user_id1 = u1.user_id
    JOIN users u2 ON fr.user_id2 = u2.user_id
    WHERE 
      (user_id1 = ? AND requestor = 'user_id2')
      OR 
      (user_id2 = ? AND requestor = 'user_id1')
  `;

   return await selectInDb(sql, [userId, userId, userId, userId, userId, userId]);
}

/** Used to add friend request or directly create friendship if mutual request */
export async function insertFriendRequest(userId, friendId) {
   let conn;
   try {
      conn = await pool.getConnection();
      await conn.beginTransaction();

      // Standardize the order of IDs
      const minId = Math.min(userId, friendId);
      const maxId = Math.max(userId, friendId);
      const isRequesterMin = userId === minId;
      const requestor = isRequesterMin ? 'user_id1' : 'user_id2';

      // Check if the other user already sent a friend request
      const checkExistingRequest = `
         SELECT * FROM friend_requests 
         WHERE user_id1 = ? AND user_id2 = ? AND 
         requestor = ?`;

      const [existingRequests] = await conn.query(checkExistingRequest, [
         minId,
         maxId,
         isRequesterMin ? 'user_id2' : 'user_id1',
      ]);

      // Check if they're already friends
      const checkFriends = `
         SELECT * FROM user_friends 
         WHERE user_id = ? AND friend_id = ?`;

      const [existingFriendship] = await conn.query(checkFriends, [userId, friendId]);

      // If they're already friends, do nothing
      if (existingFriendship && existingFriendship.length > 0) {
         await conn.rollback();
         console.error('insertFriendRequest: Users already friends');
         return false;
      }

      // If the other user already sent a request, accept it and create friendship
      if (existingRequests && existingRequests.length > 0) {
         // Create bidirectional friendship
         await conn.query('INSERT INTO user_friends (user_id, friend_id) VALUES (?, ?)', [
            userId,
            friendId,
         ]);

         await conn.query('INSERT INTO user_friends (user_id, friend_id) VALUES (?, ?)', [
            friendId,
            userId,
         ]);

         // Delete the existing request
         await conn.query('DELETE FROM friend_requests WHERE user_id1 = ? AND user_id2 = ?', [
            minId,
            maxId,
         ]);

         await conn.commit();
         return true;
      }

      // Otherwise, create a new friend request
      const insertRequest = `
         INSERT INTO friend_requests (user_id1, user_id2, requestor)
         VALUES (?, ?, ?)`;

      const result = await conn.query(insertRequest, [minId, maxId, requestor]);

      await conn.commit();

      if (result.affectedRows > 0) {
         return true;
      } else {
         console.error('insertFriendRequest: failed to add friend request');
         return false;
      }
   } catch (err) {
      if (conn) await conn.rollback();
      console.error('insertFriendRequest error:', err.message);
      return false;
   } finally {
      if (conn) conn.release();
   }
}

/** Used to delete a friend request */
export async function deleteFriendRequest(userId, friendId) {
   let conn;
   try {
      conn = await pool.getConnection();
      await conn.beginTransaction();

      // Standardize IDs for the query (respecting friend_requests_check constraint)
      const minId = Math.min(userId, friendId);
      const maxId = Math.max(userId, friendId);

      // Verify if the friend request exists and wasn't sent by current user
      const [rows] = await conn.query(
         `SELECT * FROM friend_requests 
          WHERE user_id1 = ? AND user_id2 = ? AND
          ((? = user_id1 AND requestor = 'user_id2') OR 
           (? = user_id2 AND requestor = 'user_id1'))`,
         [minId, maxId, userId, userId],
      );

      if (!rows || rows.length !== 1) {
         await conn.rollback();
         return false;
      }

      // Remove the friend request
      await conn.query('DELETE FROM friend_requests WHERE user_id1 = ? AND user_id2 = ?', [
         minId,
         maxId,
      ]);

      // Add this line to commit the transaction
      await conn.commit();
      return true;
   } catch (err) {
      if (conn) await conn.rollback();
      console.error('deleteFriendRequest: Error deleting friend request:', err.message);
      return false;
   } finally {
      if (conn) conn.release();
   }
}

/** Change friends pending status from true to false to validate friend request */
export async function insertFriend(userId, friendId) {
   let conn;
   try {
      conn = await pool.getConnection();
      await conn.beginTransaction();

      // Standardize IDs for the query (respecting friend_requests_check constraint)
      const minId = Math.min(userId, friendId);
      const maxId = Math.max(userId, friendId);

      // Verify if the friend request exists and wasn't sent by current user
      const [rows] = await conn.query(
         `SELECT * FROM friend_requests 
          WHERE user_id1 = ? AND user_id2 = ? AND
          ((? = user_id1 AND requestor = 'user_id2') OR 
           (? = user_id2 AND requestor = 'user_id1'))`,
         [minId, maxId, userId, userId],
      );

      if (!rows || rows.length !== 1) {
         await conn.rollback();
         return false;
      }

      // Insert friendship records (bidirectional)
      await conn.query('INSERT INTO user_friends (user_id, friend_id) VALUES (?, ?)', [
         userId,
         friendId,
      ]);

      await conn.query('INSERT INTO user_friends (user_id, friend_id) VALUES (?, ?)', [
         friendId,
         userId,
      ]);

      // Remove the friend request
      await conn.query('DELETE FROM friend_requests WHERE user_id1 = ? AND user_id2 = ?', [
         minId,
         maxId,
      ]);

      // Add this line to commit the transaction
      await conn.commit();
      return true;
   } catch (err) {
      if (conn) await conn.rollback();
      console.error('insertFriend: Error accepting friend request:', err.message);
      return false;
   } finally {
      if (conn) conn.release();
   }
}
