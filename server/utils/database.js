import { pool } from '../db/pool.js';

// Take an insert query with values and execute it
export async function insertInDb(query, values) {
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

// Take a select query, execute it, handle error and return result
export async function selectInDb(query, value) {
   let connection;

   try {
      connection = await pool.getConnection();

      const [rows] = await connection.query(query, value);

      const results = rows;
      console.log('Query results:', results);

      return results;
   } catch (error) {
      console.error('Error selecting data:', error);
      return false;
   } finally {
      if (connection) connection.release();
   }
}
