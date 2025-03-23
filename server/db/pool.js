import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
   host: 'localhost', // Replace with your MySQL host
   user: 'nino', // Replace with your MySQL user
   password: 't9HZ9S4nPE5H9!!hx7kIKLv5B3l@@a03MOdZk!', // Replace with your MySQL password
   database: 'gameverse', // Replace with your database name
   connectionLimit: 10, // Adjust connection limit as needed (e.g., based on expected concurrency)
});
