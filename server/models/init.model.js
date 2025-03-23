import { insertInDb } from '../utils/database';

// ** Get games data from json file **
// import { jsonToObject } from '../utils/utils.js';
// const gamesArr = jsonToObject('../db/steam-games.json');
// const gameImgArr = [
//    'header-0.webp',
//    'header-1.webp',
//    'header-10-1741682833647.webp',
//    'header-11-1741682833647.webp',
//    'header-12-1741682833647.webp',
//    'header-13-1741682833648.webp',
//    'header-14-1741682833648.webp',
//    'header-15.webp',
//    'header-16-1741682833649.webp',
//    'header-17-1741682833649.webp',
//    'header-18-1741682833649.webp',
//    'header-19-1741682833650.webp',
//    'header-2.webp',
//    'header-20-1741682833650.webp',
//    'header-21-1741682833650.webp',
//    'header-22-1741682833651.webp',
//    'header-23-1741682833651.webp',
//    'header-24-1741682833651.webp',
//    'header-25-1741682833652.webp',
//    'header-26-1741682833652.webp',
//    'header-27-1741682833652.webp',
//    'header-28-1741682833653.webp',
//    'header-29.webp',
//    'header-3.webp',
//    'header-30-1741682833653.webp',
//    'header-31-1741682833653.webp',
//    'header-32-1741682833654.webp',
//    'header-33-1741682833654.webp',
//    'header-34-1741682833654.webp',
//    'header-35-1741682833655.webp',
//    'header-36-1741682833655.webp',
//    'header-37-1741682833655.webp',
//    'header-38.webp',
//    'header-39-1741682833656.webp',
//    'header-4.webp',
//    'header-40-1741682833656.webp',
//    'header-41-1741682833657.webp',
//    'header-42-1741682833657.webp',
//    'header-43-1741682833657.webp',
//    'header-44-1741682833658.webp',
//    'header-45-1741682833658.webp',
//    'header-46-1741682833658.webp',
//    'header-47-1741682833658.webp',
//    'header-48-1741682833659.webp',
//    'header-49-1741682833659.webp',
//    'header-6.webp',
//    'header-7.webp',
//    'header-8.webp',
//    'header-9-1741682833646.webp',
// ];

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
