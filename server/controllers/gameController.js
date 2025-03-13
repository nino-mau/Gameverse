/*==============================
===========  IMPORTS  ==========
===============================*/

// Functions
import { getGameDetails } from '../db/mysql.js';
import { getGameGenres } from '../db/mysql.js';

/*==============================
==========  FUNCTIONS  =========
===============================*/

// Send infos about all games in the database
export async function sendGameInfos(req, res) {
   // Get data from database
   const gameGenres = await getGameGenres();
   const gameDetails = await getGameDetails();

   if (gameGenres && gameDetails) {
      console.log('sendGamesInfo: data sent succesfully');

      res.status(200).json({ games: gameDetails, genres: gameGenres });
   } else {
      console.error('sendGamesInfo: sql request failed');

      res.sendStatus(500);
   }
}
