import axios from 'axios';

// Your Twitch Developer credentials
const CLIENT_ID = 'bpo8yy1p43s8ilcouybrr6lwi1tfxq';
const CLIENT_SECRET = '5jfs76n5eu946ra7c1ae88m88ultem';

// Function to get access token from Twitch
async function getAccessToken() {
   try {
      const response = await axios.post(
         `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
      );
      return response.data.access_token;
   } catch (error) {
      console.error('Error getting access token:', error.message);
      throw error;
   }
}

// Function to search for game artworks by game names
async function searchGameArtworks(accessToken, gameNames) {
   // First find the game IDs
   const gamesApiUrl = 'https://api.igdb.com/v4/games';
   const gameNamesQuery = gameNames.map((name) => `"${name}"`).join(',');

   const gamesQuery = `
    fields name, id;
    where name = (${gameNamesQuery});
    limit 50;
  `;

   try {
      // Get the games first
      const gamesResponse = await axios({
         url: gamesApiUrl,
         method: 'POST',
         headers: {
            'Client-ID': CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'text/plain',
         },
         data: gamesQuery,
      });

      const gameIds = gamesResponse.data.map((game) => game.id);

      // If no games found, return empty array
      if (gameIds.length === 0) {
         return [];
      }

      // Now query for artworks using game IDs
      const artworksApiUrl = 'https://api.igdb.com/v4/artworks';
      const artworksQuery = `
      fields image_id, url, game;
      where game = (${gameIds.join(',')});
      limit 100;
    `;

      const artworksResponse = await axios({
         url: artworksApiUrl,
         method: 'POST',
         headers: {
            'Client-ID': CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'text/plain',
         },
         data: artworksQuery,
      });

      // Match artworks back to their games
      const results = [];
      for (const game of gamesResponse.data) {
         const gameArtworks = artworksResponse.data.filter((artwork) => artwork.game === game.id);
         results.push({
            name: game.name,
            artworks: gameArtworks.map((artwork) => formatArtworkUrl(artwork.url)),
         });
      }

      return results;
   } catch (error) {
      console.error('Error searching game artworks:', error.message);
      throw error;
   }
}

// Function to format artwork URLs to get higher resolution
function formatArtworkUrl(url) {
   if (!url) return null;

   // Artwork images can use different size options
   // t_original - full size image
   // t_1080p - 1920×1080 image
   // t_720p - 1280×720 image
   // t_logo_med - 284×160 image
   return `https:${url.replace('t_thumb', 't_1080p')}`;
}

// Function to extract game covers (for comparison)
async function searchGameCovers(accessToken, gameNames) {
   const apiUrl = 'https://api.igdb.com/v4/games';

   // Convert array of names to a string for the IGDB query
   const gameNamesQuery = gameNames.map((name) => `"${name}"`).join(',');

   const query = `
    fields name, cover.url;
    where name = (${gameNamesQuery});
    limit 50;
  `;

   try {
      const response = await axios({
         url: apiUrl,
         method: 'POST',
         headers: {
            'Client-ID': CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'text/plain',
         },
         data: query,
      });

      // Process results and extract image URLs
      const results = response.data.map((game) => ({
         name: game.name,
         coverUrl: game.cover ? formatCoverUrl(game.cover.url) : null,
      }));

      return results;
   } catch (error) {
      console.error('Error searching game covers:', error.message);
      throw error;
   }
}

// Function to format cover URLs
function formatCoverUrl(url) {
   if (!url) return null;
   return `https:${url.replace('t_thumb', 't_1080pp')}`;
}

// Main function to extract game images and artworks
// The problematic part is in this function
async function extractGameImagesAndArtworks(gameNames) {
   try {
      // Get access token
      const accessToken = await getAccessToken();

      // Get both covers and artworks
      const covers = await searchGameCovers(accessToken, gameNames);
      const artworks = await searchGameArtworks(accessToken, gameNames);

      // Combine results - fixed to handle non-string values
      const combinedResults = gameNames.map((gameName) => {
         // Ensure gameName is a string before calling toLowerCase()
         const gameNameStr = String(gameName);

         const coverInfo = covers.find(
            (c) => c.name && gameNameStr && c.name.toLowerCase() === gameNameStr.toLowerCase(),
         );

         const artworkInfo = artworks.find(
            (a) => a.name && gameNameStr && a.name.toLowerCase() === gameNameStr.toLowerCase(),
         );

         return {
            name: gameName,
            coverUrl: coverInfo ? coverInfo.coverUrl : null,
            artworks: artworkInfo ? artworkInfo.artworks : [],
         };
      });

      return combinedResults;
   } catch (error) {
      console.error('Error extracting game images and artworks:', error.message);
      throw error;
   }
}

// Example usage
async function main() {
   // Array of game names
   const gamesArr = [
      {
         id: 125642,
         name: 'Path of Exile 2',
         description:
            'Path of Exile 2 is a next generation Action RPG created by Grinding Gear Games. Set years after the original Path of Exile, you will return to the dark world of Wraeclast and seek to end the corruption that is spreading. Path of Exile 2 is a free-to-play online multiplayer game with co-op for up to six players.',
         genres: ['Role-playing (RPG)', 'Hack and slash', 'Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'PlayStation 5', 'Mac'],
         user_rating: 9,
         critic_rating: null,
         popularity_metrics: {
            rating_count: 100,
            follows: 0,
            hypes: 45,
         },
         release_date: '2024-12-06',
         price: '$49.99',
      },
      {
         id: 24863,
         name: 'Wasteland 3',
         description:
            "As the sole survivor of Team November, a Ranger squad dispatched to the icy Colorado wastes, you find this is a land of buried secrets, lost technology, fearsome lunatics, and deadly factions. No one here has ever heard of the Desert Rangers. Your reputation is yours to build from scratch, and your choices may save this land or doom it. With a renewed focus on macro-reactivity, you'll be picking between warring factions, deciding whether locations are destroyed or saved, and making other far reaching decisions that have a marked impact on the shape of your world.",
         genres: [
            'Role-playing (RPG)',
            'Strategy',
            'Turn-based strategy (TBS)',
            'Tactical',
            'Adventure',
         ],
         platforms: ['PlayStation 4', 'Linux', 'PC (Microsoft Windows)', 'Mac', 'Xbox One'],
         user_rating: 8.4,
         critic_rating: 8.7,
         popularity_metrics: {
            rating_count: 82,
            follows: 0,
            hypes: 29,
         },
         release_date: '2020-08-27',
         price: '$54.99',
      },
      {
         id: 14741,
         name: 'Psychonauts 2',
         description:
            'Psychonauts 2 is a mind-bending trip through the strange worlds hiding inside our brains. Freshly-minted special agent and acrobat extraordinaire Razputin “Raz” Aquato returns to unpack emotional baggage and expand mental horizons. Along the way he’ll help new friends, like this magical mote of light voiced (and sung) by Jack Black. Raz must use his powers to unravel dark mysteries about the Psychonauts team and his own family origins.',
         genres: ['Platform', 'Adventure'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'Linux',
            'PC (Microsoft Windows)',
            'Mac',
            'Xbox One',
         ],
         user_rating: 8.8,
         critic_rating: 8.7,
         popularity_metrics: {
            rating_count: 151,
            follows: 0,
            hypes: 67,
         },
         release_date: '2021-08-24',
         price: '$54.99',
      },
      {
         id: 26192,
         name: 'The Last of Us Part II',
         description:
            'The Last of Us Part II is an action-adventure game set five years after the events of The Last of Us. The player traverses post-apocalyptic environments such as buildings and forests to advance the story. They can use firearms, improvised weapons, and stealth to defend against hostile humans and cannibalistic creatures infected by a mutated strain of the Cordyceps fungus. The game intermittently switches control between Ellie and Abby, and also briefly Joel in the opening sequence. The nimble nature of the player character introduces platforming elements, allowing the player to jump and climb to traverse environments and gain advantages during combat.',
         genres: ['Shooter', 'Adventure'],
         platforms: ['PlayStation 4'],
         user_rating: 9.3,
         critic_rating: 9.5,
         popularity_metrics: {
            rating_count: 1246,
            follows: 0,
            hypes: 326,
         },
         release_date: '2020-06-19',
         price: '$24.99',
      },
      {
         id: 23733,
         name: 'Tunic',
         description:
            'Tunic is an action adventure about a tiny fox in a big world. Explore the wilderness, discover spooky ruins, and fight terrible creatures from long ago.',
         genres: ['Puzzle', 'Role-playing (RPG)', 'Adventure', 'Indie'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Mac',
            'Xbox One',
            'Nintendo Switch',
         ],
         user_rating: 8.7,
         critic_rating: 8.9,
         popularity_metrics: {
            rating_count: 166,
            follows: 0,
            hypes: 68,
         },
         release_date: '2022-03-16',
         price: '$54.99',
      },
      {
         id: 119133,
         name: 'Elden Ring',
         description:
            'Elden Ring is an action RPG developed by FromSoftware and published by Bandai Namco Entertainment, released in February 2022. Directed by Hidetaka Miyazaki, with world-building contributions from novelist George R. R. Martin, the game features an expansive open world called the Lands Between. Players assume the role of a customisable character known as the Tarnished, who must explore this world, battle formidable enemies, and seek to restore the Elden Ring to become the Elden Lord.\n\nThe game builds on the challenging gameplay mechanics familiar from the Dark Souls series but introduces a more open-ended structure with vast exploration, dynamic weather, and a day-night cycle. It offers deep lore, complex characters, and an interconnected world filled with secrets, dungeons, and powerful bosses.',
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 9.6,
         critic_rating: 9.7,
         popularity_metrics: {
            rating_count: 1364,
            follows: 0,
            hypes: 96,
         },
         release_date: '2022-02-25',
         price: '$54.99',
      },
      {
         id: 101440,
         name: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
         description:
            'S.T.A.L.K.E.R 2 is a unique blend of FPS, immersive sim and horror with a really thick atmosphere. One of the biggest open-worlds to date is yours to explore — along with an epic branching story with multiple endings. S.T.A.L.K.E.R. stands for (Scavengers, Trespassers, Adventurers, Loners, Killers, Explorers and Robbers).',
         genres: ['Shooter', 'Role-playing (RPG)', 'Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)'],
         user_rating: 8.4,
         critic_rating: 8.7,
         popularity_metrics: {
            rating_count: 76,
            follows: 0,
            hypes: 348,
         },
         release_date: '2024-11-20',
         price: '$54.99',
      },
      {
         id: 96437,
         name: 'Starfield',
         description:
            'In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom as you embark on an epic journey to answer humanity’s greatest mystery.',
         genres: ['Shooter', 'Role-playing (RPG)', 'Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)'],
         user_rating: 7.9,
         critic_rating: 8.7,
         popularity_metrics: {
            rating_count: 265,
            follows: 0,
            hypes: 136,
         },
         release_date: '2023-09-06',
         price: '$39.99',
      },
      {
         id: 152242,
         name: 'A Plague Tale: Requiem',
         description:
            'A Plague Tale: Requiem is an action-adventure game similar to its predecessor. The player assumes control of Amicia and must face against both soldiers from the French Inquisition and hordes of rats that are spreading the black plague. The gameplay is largely similar to the first game, though the combat system is significantly expanded. The game features a progression system in which the player will be awarded additional skills and abilities. Stealth players will unlock skills that allow them to sneak around more efficiently, while those who prefer a more lethal approach will unlock additional combat skills. Locations are also larger, giving players additional options to progress.',
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: [
            'Xbox Series X|S',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Nintendo Switch',
         ],
         user_rating: 8.5,
         critic_rating: 8.6,
         popularity_metrics: {
            rating_count: 198,
            follows: 0,
            hypes: 21,
         },
         release_date: '2022-10-18',
         price: '$34.99',
      },
      {
         id: 55163,
         name: 'Resident Evil Village',
         description:
            'Resident Evil Village is a first person survival horror and the sequel to Resident Evil 7: Biohazard. The game maintains elements from previous Resident Evil games with players having to scavenge environments for items and manage their resources. However, it adds more action-oriented gameplay, with higher enemy counts and a greater emphasis on combat.',
         genres: ['Shooter', 'Adventure'],
         platforms: [
            'Google Stadia',
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'iOS',
            'PlayStation 5',
            'Mac',
            'Xbox One',
            'Nintendo Switch',
         ],
         user_rating: 8.5,
         critic_rating: 8.7,
         popularity_metrics: {
            rating_count: 356,
            follows: 0,
            hypes: 31,
         },
         release_date: '2021-05-06',
         price: '$34.99',
      },
      {
         id: 142415,
         name: 'Indiana Jones and the Great Circle',
         description:
            'Uncover one of history’s greatest mysteries in Indiana Jones and the Great Circle, a first-person, single-player adventure set between the events of Raiders of the Lost Ark and The Last Crusade. You’ll become the legendary archaeologist in this cinematic action-adventure game from MachineGames, the award-winning studio behind the recent Wolfenstein series, and executive produced by Hall of Fame game designer Todd Howard.',
         genres: ['Puzzle', 'Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 8.6,
         critic_rating: 8.6,
         popularity_metrics: {
            rating_count: 85,
            follows: 0,
            hypes: 132,
         },
         release_date: '2024-12-09',
         price: '$29.99',
      },
      {
         id: 185252,
         name: 'Warhammer 40,000: Space Marine II',
         description:
            "The galaxy is in peril. Entire worlds are falling. The Imperium needs you. Embody the superhuman skill and brutality of a Space Marine, the greatest of the Emperor's warriors, with Clive Standen (Vikings, Taken) as the iconic Captain Titus. Unleash deadly abilities and an arsenal of devastating weaponry to obliterate the relentless Tyranid hordes. Hold at bay the horrors of the galaxy in epic battles on far-flung planets. Uncover dark secrets and drive back the everlasting night to prove your ultimate loyalty to humanity.",
         genres: ['Shooter', 'Role-playing (RPG)', 'Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 8,
         critic_rating: 7.9,
         popularity_metrics: {
            rating_count: 67,
            follows: 0,
            hypes: 63,
         },
         release_date: '2024-09-09',
         price: '$54.99',
      },
      {
         id: 252837,
         name: 'Still Wakes the Deep',
         description:
            '1975. Disaster strikes the Beira D oil rig off the coast of Scotland. Navigate the collapsing rig to save your crew from an otherworldly horror on the edge of all logic and reality.',
         genres: ['Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 7.7,
         critic_rating: 8.2,
         popularity_metrics: {
            rating_count: 52,
            follows: 0,
            hypes: 22,
         },
         release_date: '2024-06-18',
         price: '$39.99',
      },
      {
         id: 294041,
         name: 'Marvel Rivals',
         description:
            'Marvel Rivals is an hero shooter video game developed and published by NetEase Games in collaboration with Marvel Games. The game is free-to-play with a current line up of 33 characters from Marvel Comics.',
         genres: ['Shooter'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 7.8,
         critic_rating: 8.1,
         popularity_metrics: {
            rating_count: 181,
            follows: 0,
            hypes: 252,
         },
         release_date: '2024-12-06',
         price: '$39.99',
      },
      {
         id: 103298,
         name: 'Doom Eternal',
         description:
            'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
         genres: ['Shooter'],
         platforms: [
            'Google Stadia',
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
            'Nintendo Switch',
         ],
         user_rating: 8.6,
         critic_rating: 8.6,
         popularity_metrics: {
            rating_count: 547,
            follows: 0,
            hypes: 124,
         },
         release_date: '2020-03-19',
         price: '$19.99',
      },
      {
         id: 133004,
         name: "Assassin's Creed Valhalla",
         description:
            "In Assassin's Creed Valhalla, become Eivor, a legendary Viking raider on a quest for glory. Explore a dynamic and beautiful open world set against the brutal backdrop of England’s Dark Ages. Raid your enemies, grow your settlement, and build your political power in the quest to earn a place among the gods in Valhalla.",
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: [
            'Google Stadia',
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 8,
         critic_rating: 8.5,
         popularity_metrics: {
            rating_count: 330,
            follows: 0,
            hypes: 24,
         },
         release_date: '2020-11-10',
         price: '$19.99',
      },
      {
         id: 136879,
         name: 'Black Myth: Wukong',
         description:
            'Black Myth: Wukong is an action RPG rooted in Chinese mythology. The story is based on Journey to the West, one of the Four Great Classical Novels of Chinese literature. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past.',
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 8.9,
         critic_rating: 8.8,
         popularity_metrics: {
            rating_count: 134,
            follows: 0,
            hypes: 180,
         },
         release_date: '2024-08-20',
         price: '$54.99',
      },
      {
         id: 222341,
         name: 'Silent Hill 2',
         description:
            'Investigating a letter from his late wife, James returns to where they made so many memories - Silent Hill. What he finds is a ghost town, prowled by disturbing monsters and cloaked in deep fog. Confront the monsters, solve puzzles, and search for traces of your wife in this remake of Silent Hill 2.',
         genres: ['Puzzle', 'Adventure'],
         platforms: ['PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 8.9,
         critic_rating: 8.7,
         popularity_metrics: {
            rating_count: 125,
            follows: 0,
            hypes: 72,
         },
         release_date: '2024-10-08',
         price: '$19.99',
      },
      {
         id: 1877,
         name: 'Cyberpunk 2077',
         description:
            'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.',
         genres: ['Shooter', 'Role-playing (RPG)', 'Adventure'],
         platforms: [
            'Google Stadia',
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Mac',
            'Xbox One',
         ],
         user_rating: 7.9,
         critic_rating: 7.5,
         popularity_metrics: {
            rating_count: 1082,
            follows: 0,
            hypes: 1038,
         },
         release_date: '2020-12-10',
         price: '$34.99',
      },
      {
         id: 112874,
         name: 'Horizon Forbidden West',
         description:
            'Horizon Forbidden West continues Aloy’s story as she moves west to a far-future America to brave a majestic, but dangerous frontier where she’ll face awe-inspiring machines and mysterious new threats.',
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: ['PlayStation 4', 'PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 8.9,
         critic_rating: 9.2,
         popularity_metrics: {
            rating_count: 261,
            follows: 0,
            hypes: 173,
         },
         release_date: '2022-02-18',
         price: '$29.99',
      },
      {
         id: 31551,
         name: 'Final Fantasy XVI',
         description:
            'Final Fantasy XVI is the first fully fledged action RPG in the mainline Final Fantasy series. Clive Rosfield is on a mission to free mankind from its fate, and must use the Eikonic powers at his disposal to overcome every obstacle his enemies lay before him.',
         genres: ['Role-playing (RPG)'],
         platforms: ['PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 8.9,
         critic_rating: 9.2,
         popularity_metrics: {
            rating_count: 121,
            follows: 0,
            hypes: 27,
         },
         release_date: '2023-06-22',
         price: '$54.99',
      },
      {
         id: 103281,
         name: 'Halo Infinite',
         description:
            'The Master Chief returns in Halo Infinite – the next chapter of the legendary franchise. When all hope is lost and humanity’s fate hangs in the balance, the Master Chief is ready to confront the most ruthless foe he’s ever faced. Step inside the armor of humanity’s greatest hero to experience an epic adventure and explore the massive scale of the Halo ring.',
         genres: ['Shooter', 'Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'Xbox One'],
         user_rating: 8.4,
         critic_rating: 8.8,
         popularity_metrics: {
            rating_count: 227,
            follows: 0,
            hypes: 151,
         },
         release_date: '2021-11-15',
         price: '$39.99',
      },
      {
         id: 240009,
         name: 'Elden Ring: Shadow of the Erdtree',
         description:
            'The Shadow of the Erdtree is a fully-fledged expansion that features an all-new story set in the Land of Shadow. It adds a whole new map with 70 new weapons, ten new shields, 39 new Talismans, 14 new sorceries, 28 new incantations, 20 new Spirit Ashes, 25 New Ashes of War, 30 new armour sets, and new consumables and craftables.',
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 9.2,
         critic_rating: 9.7,
         popularity_metrics: {
            rating_count: 83,
            follows: 0,
            hypes: 63,
         },
         release_date: '2024-06-21',
         price: '$49.99',
      },
      {
         id: 136625,
         name: 'Hogwarts Legacy',
         description:
            'Hogwarts Legacy is an immersive, open-world action RPG set in the world first introduced in the Harry Potter books. Now you can take control of the action and be at the center of your own adventure in the wizarding world. Embark on a journey through familiar and new locations as you explore and discover fantastic beasts, customize your character and craft potions, master spell casting, upgrade talents, and become the wizard you want to be. Discover the feeling of living at Hogwarts as you make allies, battle Dark wizards, and ultimately decide the fate of the wizarding world. Your legacy is what you make of it.',
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
            'Nintendo Switch',
         ],
         user_rating: 8.3,
         critic_rating: 8.6,
         popularity_metrics: {
            rating_count: 397,
            follows: 0,
            hypes: 141,
         },
         release_date: '2023-02-10',
         price: '$44.99',
      },
      {
         id: 125165,
         name: 'Diablo IV',
         description:
            'Endless demons to slaughter. Deep customization through Talents, Skill Points, Runes, and Legendary loot. Randomized dungeons contained in a dynamic open world. Survive and conquer darkness—or succumb to the shadows.',
         genres: ['Role-playing (RPG)', 'Hack and slash'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 8.4,
         critic_rating: 9,
         popularity_metrics: {
            rating_count: 265,
            follows: 0,
            hypes: 65,
         },
         release_date: '2023-06-06',
         price: '$29.99',
      },
      {
         id: 302156,
         name: 'Call of Duty: Black Ops 6',
         description:
            'Developed by Treyarch and Raven, Black Ops 6 is a spy action thriller set in the early 90s, a period of transition and upheaval in global politics, characterized by the end of the Cold War and the rise of the United States as a single superpower. With a mind-bending narrative, and unbound by the rules of engagement, this is signature Black Ops.\n\nThe Black Ops 6 Campaign provides dynamic moment-to-moment gameplay that includes a variety of play spaces with blockbuster set pieces and action-packed moments, high-stakes heists, and cloak-and-dagger spy activity.\n\nIn a best-in-class Multiplayer experience, players will test their skills across 16 new maps at launch, including 12 core 6v6 maps and 4 Strike maps that can be played 2v2 or 6v6.\n\nBlack Ops 6 also marks the epic return of Round-Based Zombies, the fan-favorite mode where players will take down hordes of the undead in two brand-new maps at launch. Post-launch, players can look forward to even more exciting maps and groundbreaking experiences dropping into both Multiplayer and Zombies.',
         genres: ['Shooter'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 7.9,
         critic_rating: 8.3,
         popularity_metrics: {
            rating_count: 100,
            follows: 0,
            hypes: 76,
         },
         release_date: '2024-10-25',
         price: '$19.99',
      },
      {
         id: 201156,
         name: 'Star Wars Jedi: Survivor',
         description:
            'The story of Cal Kestis continues in Star Wars Jedi: Survivor, a third-person, galaxy-spanning, action-adventure game from Respawn Entertainment, developed in collaboration with Lucasfilm Games. This narratively driven, single-player title picks up five years after the events of Star Wars Jedi: Fallen Order and follows Cal’s increasingly desperate fight as the galaxy descends further into darkness. Pushed to the edges of the galaxy by the Empire, Cal will find himself surrounded by threats new and familiar. As one of the last surviving Jedi Knights, Cal is driven to make a stand during the galaxy’s darkest times — but how far is he willing to go to protect himself, his crew, and the legacy of the Jedi Order?',
         genres: ['Adventure'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 8.4,
         critic_rating: 8.5,
         popularity_metrics: {
            rating_count: 160,
            follows: 0,
            hypes: 24,
         },
         release_date: '2023-04-28',
         price: '$39.99',
      },
      {
         id: 110248,
         name: 'Stray',
         description:
            'Stray is a third-person cat adventure game set amidst the detailed neon-lit alleys of a decaying cybercity and the murky environments of its seedy underbelly. Roam surroundings high and low, defend against unforeseen threats and solve the mysteries of this unwelcoming place inhabited by nothing but unassuming droids and dangerous creatures.\n\nSee the world through the eyes of a stray and interact with the environment in playful ways. Be stealthy, nimble, silly, and sometimes as annoying as possible with the strange inhabitants of this foreign world.',
         genres: ['Platform', 'Adventure', 'Indie'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Mac',
            'Xbox One',
            'Nintendo Switch',
         ],
         user_rating: 8.3,
         critic_rating: 8.5,
         popularity_metrics: {
            rating_count: 500,
            follows: 0,
            hypes: 45,
         },
         release_date: '2022-07-19',
         price: '$44.99',
      },
      {
         id: 102058,
         name: 'Outriders',
         description:
            'Outriders is a 1-3 player co-op RPG shooter set in an original, dark and desperate sci-fi universe. As mankind bleeds out in the trenches of Enoch, you’ll create your own Outrider and embark on a journey across the hostile planet. With rich storytelling spanning a diverse world, you’ll leave behind the slums and shanty towns of the First City and traverse forests, mountains and desert in the pursuit of a mysterious signal. Combining intense gunplay with violent powers and an arsenal of increasingly twisted weaponry and gear-sets, Outriders offers countless hours of gameplay.',
         genres: ['Shooter', 'Role-playing (RPG)', 'Adventure'],
         platforms: [
            'Google Stadia',
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 7.6,
         critic_rating: 7.8,
         popularity_metrics: {
            rating_count: 72,
            follows: 0,
            hypes: 31,
         },
         release_date: '2021-04-01',
         price: '$44.99',
      },
      {
         id: 119305,
         name: 'LEGO Star Wars: The Skywalker Saga',
         description:
            "Lego Star Wars: The Skywalker Saga is a third-person action-adventure with an open world hub. Unlike previous Lego games in which players had to advance through the story in a linear order, players can now choose to start the game from any of the main Skywalker Saga episodes and complete them in any order they wish. Each episode has their own hub filled with planets featured prominently in each respective film that can be visited and explored. Each episode will have five story missions each, a total of 45 levels.\n\nCombat has also been revamped, such as lightsaber fights now involving a variety of combos with light attacks, heavy attacks, and Force moves, and blaster characters having an over-the-shoulder camera angle featured in many third-person shooter games.\n\nRandom encounters will also happen in the game's hub. For example, an Imperial Star Destroyer will suddenly jump out of hyperspace and send a fleet of TIE Fighters after the player. Players can choose to engage in dogfights with them or continue onward to progress the story. The game will have more than 200 playable characters, though TT Games has said that number will change.",
         genres: ['Puzzle', 'Adventure'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
            'Nintendo Switch',
         ],
         user_rating: 8.1,
         critic_rating: 8.2,
         popularity_metrics: {
            rating_count: 88,
            follows: 0,
            hypes: 37,
         },
         release_date: '2022-04-05',
         price: '$49.99',
      },
      {
         id: 134584,
         name: 'Returnal',
         description:
            'Returnal is a 2021 roguelike third-person shooter video game developed by Housemarque and published by Sony Interactive Entertainment.\n\nIt follows Selene Vassos, an astronaut who lands on the planet Atropos in search of the mysterious "White Shadow" signal and finds herself trapped in a time loop.\n\nAfter crash-landing on a shape-shifting alien planet, Selene finds herself fighting tooth and nail for survival. Every time she’s defeated, the player is forced to restart the journey.',
         genres: ['Shooter'],
         platforms: ['PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 8.6,
         critic_rating: 9,
         popularity_metrics: {
            rating_count: 140,
            follows: 0,
            hypes: 21,
         },
         release_date: '2021-04-30',
         price: '$39.99',
      },
      {
         id: 112875,
         name: 'God of War Ragnarök',
         description:
            "God of War: Ragnarök is the ninth installment in the God of War series and the sequel to 2018's God of War. Continuing with the Norse mythology theme, the game is set in ancient Norway and features series protagonists Kratos, the former Greek God of War, and his young son Atreus. The game kicked off the events of Ragnarök, where Kratos and Atreus must journey to each of the Nine Realms in search of answers as they prepare for the prophesied battle that will end the world.",
         genres: ['Role-playing (RPG)', 'Hack and slash', 'Adventure'],
         platforms: ['PlayStation 4', 'PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 9.3,
         critic_rating: 9.5,
         popularity_metrics: {
            rating_count: 612,
            follows: 0,
            hypes: 77,
         },
         release_date: '2022-11-09',
         price: '$39.99',
      },
      {
         id: 132181,
         name: 'Resident Evil 4',
         description:
            'Resident Evil 4 is a remake of the 2005 original Resident Evil 4 reimagined for 2023 to bring state-of-the-art survival horror. Resident Evil 4 preserves the essence of the original game, while introducing modernized gameplay, a reimagined storyline,\nand vividly detailed graphics to make this the latest survival horror game where life and death, terror and catharsis intersect.',
         genres: ['Shooter', 'Puzzle', 'Adventure'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'iOS',
            'PlayStation 5',
            'Mac',
         ],
         user_rating: 9.3,
         critic_rating: 9.5,
         popularity_metrics: {
            rating_count: 418,
            follows: 0,
            hypes: 22,
         },
         release_date: '2023-03-24',
         price: '$44.99',
      },
      {
         id: 9608,
         name: 'Mount & Blade II: Bannerlord',
         description:
            'Mount & Blade II: Bannerlord is the eagerly awaited sequel to the acclaimed medieval combat simulator and role-playing game Mount & Blade: Warband. Set 200 years before, it expands both the detailed fighting system and the world of Calradia. Bombard mountain fastnesses with siege engines, establish secret criminal empires in the back alleys of cities, or charge into the thick of chaotic battles in your quest for power.',
         genres: ['Role-playing (RPG)', 'Simulator', 'Strategy', 'Tactical', 'Adventure'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 7.9,
         critic_rating: 8,
         popularity_metrics: {
            rating_count: 117,
            follows: 0,
            hypes: 67,
         },
         release_date: '2020-03-30',
         price: '$24.99',
      },
      {
         id: 109462,
         name: 'Animal Crossing: New Horizons',
         description:
            'Escape to a deserted island and create your own paradise as you explore, create, and customize in Animal Crossing: New Horizons. Your island getaway has a wealth of natural resources that can be used to craft everything from tools to creature comforts. You can hunt down insects at the crack of dawn, decorate your paradise throughout the day, or enjoy sunset on the beach while fishing in the ocean. The time of day and season match real life, so each day on your island is a chance to check in and find new surprises all year round.',
         genres: ['Simulator'],
         platforms: ['Nintendo Switch'],
         user_rating: 8.6,
         critic_rating: 9,
         popularity_metrics: {
            rating_count: 409,
            follows: 0,
            hypes: 29,
         },
         release_date: '2020-03-19',
         price: '$54.99',
      },
      {
         id: 134588,
         name: 'Kena: Bridge of Spirits',
         description:
            "Kena: Bridge of Spirits is a 2021 action-adventure video game developed and published by Ember Lab. The story follows Kena, a young spirit guide who uses her magical abilities to help deceased people move from the physical to the spirit world. The game is presented through a third-person perspective. The player uses Kena's staff for attacking enemies, and her pulse ability for defending against attacks. They are tasked with collecting small spirit companions known as the Rot, who help to complete tasks and battle against enemies.",
         genres: ['Role-playing (RPG)', 'Adventure', 'Indie'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 8.1,
         critic_rating: 8.3,
         popularity_metrics: {
            rating_count: 172,
            follows: 0,
            hypes: 34,
         },
         release_date: '2021-09-20',
         price: '$39.99',
      },
      {
         id: 75235,
         name: 'Ghost of Tsushima',
         description:
            'Uncover the hidden wonders of Tsushima in this open-world action adventure. Forge a new path and wage an unconventional war for the freedom of Tsushima. Challenge opponents with your katana, master the bow to eliminate distant threats, develop stealth tactics to ambush enemies in order to win over the mongols.',
         genres: ['Role-playing (RPG)', 'Hack and slash', 'Adventure'],
         platforms: ['PlayStation 4'],
         user_rating: 9.1,
         critic_rating: 9.2,
         popularity_metrics: {
            rating_count: 659,
            follows: 0,
            hypes: 117,
         },
         release_date: '2020-07-17',
         price: '$34.99',
      },
      {
         id: 126290,
         name: 'Far Cry 6',
         description:
            'Dive into the gritty world of a modern-day guerrilla revolution to liberate a nation from its oppressive dictators. Welcome to Yara, a tropical paradise frozen in time. Far Cry 6 thrusts players into a modern-day guerrilla revolution. As dictator of Yara, Anton Castillo is intent on restoring his nation back to its former glory by any means, with his son, Diego, following in his bloody footsteps. Become a guerrilla fighter and liberate Yara.',
         genres: ['Shooter', 'Adventure'],
         platforms: [
            'Google Stadia',
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 7.6,
         critic_rating: 8.2,
         popularity_metrics: {
            rating_count: 166,
            follows: 0,
            hypes: 31,
         },
         release_date: '2021-10-07',
         price: '$49.99',
      },
      {
         id: 37001,
         name: 'Ori and the Will of the Wisps',
         description:
            'The little spirit Ori is no stranger to peril, but when a fateful flight puts the owlet Ku in harm’s way, it will take more than bravery to bring a family back together, heal a broken land, and discover Ori’s true destiny. From the creators of the acclaimed action-platformer Ori and the Blind Forest comes the highly anticipated sequel. Embark on an all-new adventure in a vast world filled with new friends and foes that come to life in stunning, hand-painted artwork. Set to a fully orchestrated original score, Ori and the Will of the Wisps continues the Moon Studios tradition of tightly crafted platforming action and deeply emotional storytelling.',
         genres: ['Platform', 'Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'Xbox One', 'Nintendo Switch'],
         user_rating: 8.9,
         critic_rating: 9.1,
         popularity_metrics: {
            rating_count: 471,
            follows: 0,
            hypes: 66,
         },
         release_date: '2020-03-10',
         price: '$54.99',
      },
      {
         id: 11169,
         name: 'Final Fantasy VII Remake',
         description:
            'A spectacular re-imagining of one of the most visionary games ever, Final Fantasy VII Remake rebuilds and expands the legendary RPG for today. The first game in this project is set in the eclectic city of Midgar and presents a fully standalone gaming experience.',
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: ['PlayStation 4', 'PlayStation 5'],
         user_rating: 8.9,
         critic_rating: 8.9,
         popularity_metrics: {
            rating_count: 419,
            follows: 0,
            hypes: 228,
         },
         release_date: '2020-04-10',
         price: '$29.99',
      },
      {
         id: 119308,
         name: 'Ghostwire: Tokyo',
         description:
            "After strange disappearances hit Tokyo's population, it's up to you to uncover the source and purge the city of a strange, new evil. Armed with your own mysterious spectral abilities, you will face down the occult, unravel conspiracy theories and experience urban legends like never before.",
         genres: ['Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 7.6,
         critic_rating: 7.7,
         popularity_metrics: {
            rating_count: 148,
            follows: 0,
            hypes: 55,
         },
         release_date: '2022-03-24',
         price: '$24.99',
      },
      {
         id: 131999,
         name: 'NieR Replicant ver.1.22474487139...',
         description:
            'NieR Replicant ver.1.22474487139... is an updated version of NieR Replicant, previously only released in Japan. Discover the one-of-a-kind prequel to the critically-acclaimed masterpiece NieR: Automata. Now with a modern upgrade, experience masterfully revived visuals, a fascinating storyline and more!',
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: ['PlayStation 4', 'PC (Microsoft Windows)', 'Xbox One'],
         user_rating: 8.3,
         critic_rating: 8.2,
         popularity_metrics: {
            rating_count: 155,
            follows: 0,
            hypes: 31,
         },
         release_date: '2021-04-22',
         price: '$39.99',
      },
      {
         id: 303811,
         name: 'Astro Bot',
         description:
            'Buckle up for some epic PlayStation camaraderie, join forces with your favourite PlayStation icons and show the universe that small is mighty in this fresh new Astro adventure, exclusive to PS5 consoles!',
         genres: ['Platform', 'Adventure'],
         platforms: ['PlayStation 5'],
         user_rating: 9.3,
         critic_rating: 9.4,
         popularity_metrics: {
            rating_count: 70,
            follows: 0,
            hypes: 43,
         },
         release_date: '2024-09-06',
         price: '$54.99',
      },
      {
         id: 159119,
         name: 'Dead Space',
         description:
            'The sci-fi survival horror classic Dead Space returns, completely rebuilt from the ground up by Motive Studios to offer a deeper and more immersive experience. Harnessing the power of the Frostbite game engine and next generation consoles, this remake brings jaw-dropping visual fidelity and improvements to gameplay while staying true to the original.',
         genres: ['Shooter', 'Role-playing (RPG)', 'Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 8.7,
         critic_rating: 9.1,
         popularity_metrics: {
            rating_count: 139,
            follows: 0,
            hypes: 26,
         },
         release_date: '2023-01-27',
         price: '$44.99',
      },
      {
         id: 119388,
         name: 'The Legend of Zelda: Tears of the Kingdom',
         description:
            'The Legend of Zelda: Tears of the Kingdom is the sequel to The Legend of Zelda: Breath of the Wild. The setting for Link’s adventure has been expanded to include the skies above the vast lands of Hyrule.',
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: ['Nintendo Switch'],
         user_rating: 9.5,
         critic_rating: 9.5,
         popularity_metrics: {
            rating_count: 554,
            follows: 0,
            hypes: 79,
         },
         release_date: '2023-05-12',
         price: '$24.99',
      },
      {
         id: 113598,
         name: 'Deathloop',
         description:
            'Deathloop transports players to the lawless island of Blackreef in an eternal struggle between two extraordinary assassins. Explore stunning environments and meticulously designed levels in an immersive gameplay experience that lets you approach every situation any way you like. Hunt down targets all over the island in an effort to put an end to the cycle once and for all, and remember, if at first you don’t succeed… die, die again.',
         genres: ['Shooter', 'Adventure'],
         platforms: ['Xbox Series X|S', 'PC (Microsoft Windows)', 'PlayStation 5'],
         user_rating: 8.6,
         critic_rating: 9,
         popularity_metrics: {
            rating_count: 189,
            follows: 0,
            hypes: 38,
         },
         release_date: '2021-09-14',
         price: '$39.99',
      },
      {
         id: 138343,
         name: 'Hyrule Warriors: Age of Calamity',
         description:
            'See Hyrule 100 years before the Legend of Zelda: Breath of the Wild game and experience the events of the Great Calamity.\n\nJoin the struggle that brought Hyrule to its knees. Learn more about Zelda, the four Champions, the King of Hyrule and more through dramatic cutscenes as they try to save the kingdom from Calamity. The Hyrule Warriors: Age of Calamity game is the only way to see firsthand what happened 100 years ago.\n\nBattle hordes of Hyrule’s most formidable foes. From barbaric Bokoblins to towering Lynels, menacing monsters have emerged in droves. In addition to Link and Zelda, take control of characters like the four Champions and a young Impa. Use their distinct abilities to carve through hundreds of enemies to save Hyrule from the impending Calamity.',
         genres: ['Fighting', 'Hack and slash', 'Adventure'],
         platforms: ['Nintendo Switch'],
         user_rating: 8,
         critic_rating: 8,
         popularity_metrics: {
            rating_count: 51,
            follows: 0,
            hypes: 23,
         },
         release_date: '2020-11-19',
         price: '$39.99',
      },
      {
         id: 119270,
         name: 'Tales of Arise',
         description:
            'On the planet Dahna, reverence has always been given to Rena--the planet in the sky--as a land of the righteous and divine. Stories handed down for generations became truth and masked reality for the people of Dahna. For 300 years, Rena has ruled over Dahna, pillaging the planet of its resources and stripping people of their dignity and freedom.\n\nOur tale begins with two people, born on different worlds, each looking to change their fate and create a new future. Featuring a diverse cast of characters, intuitive and rewarding combat system, and a captivating story set in a lush world worth fighting for, Tales of Arise delivers a first-class JRPG experience.',
         genres: ['Role-playing (RPG)', 'Adventure'],
         platforms: [
            'Xbox Series X|S',
            'PlayStation 4',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Xbox One',
         ],
         user_rating: 8.5,
         critic_rating: 8.7,
         popularity_metrics: {
            rating_count: 64,
            follows: 0,
            hypes: 31,
         },
         release_date: '2021-09-10',
         price: '$49.99',
      },
      {
         id: 119171,
         name: "Baldur's Gate 3",
         description:
            "An ancient evil has returned to Baldur's Gate, intent on devouring it from the inside out. The fate of Faerun lies in your hands. Alone, you may resist. But together, you can overcome.",
         genres: [
            'Role-playing (RPG)',
            'Strategy',
            'Turn-based strategy (TBS)',
            'Tactical',
            'Adventure',
         ],
         platforms: [
            'Google Stadia',
            'Xbox Series X|S',
            'PC (Microsoft Windows)',
            'PlayStation 5',
            'Mac',
         ],
         user_rating: 9.5,
         critic_rating: 9.5,
         popularity_metrics: {
            rating_count: 779,
            follows: 0,
            hypes: 39,
         },
         release_date: '2023-08-03',
         price: '$24.99',
      },
      {
         id: 55029,
         name: 'Age of Empires IV',
         description:
            'One of the most beloved real-time strategy games returns to glory with Age of Empires IV, putting you at the center of epic historical battles that shaped the world. Featuring both familiar and innovative new ways to expand your empire in vast landscapes with stunning 4K visual fidelity, Age of Empires IV brings an evolved real-time strategy game to a new generation.',
         genres: ['Real Time Strategy (RTS)', 'Strategy'],
         platforms: ['PC (Microsoft Windows)'],
         user_rating: 7.7,
         critic_rating: 8.2,
         popularity_metrics: {
            rating_count: 91,
            follows: 0,
            hypes: 87,
         },
         release_date: '2021-10-28',
         price: '$29.99',
      },
   ];

   const gameNames = gamesArr.map((obj) => [obj.name]);

   try {
      const results = await extractGameImagesAndArtworks(gameNames);
      console.log(JSON.stringify(results, null, 2));
   } catch (error) {
      console.error('Main process error:', error);
   }
}

main();
