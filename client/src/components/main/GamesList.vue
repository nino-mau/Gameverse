<script setup>
// **** IMPORT ****
import { reactive, onMounted } from 'vue';

// Icons
import { Bookmark } from 'lucide-vue-next';

// Functions
import { getData } from '@/utils/api';
import { denormalizeAssociativeTable } from '@/utils/general';

// **** LOGIC ****

// Make get request to server for specific games info needed on this page
async function getGameInfos() {
   try {
      const gamesData = await getData('https://gameverse.local/api/games/');
      return { games: gamesData.games, genres: gamesData.genres };
   } catch (err) {
      console.log('GetGameInfos: error fetching games data:', err);
   }
}

// Create the reactive object which will store games infos
const gamesObject = reactive([]);

onMounted(async () => {
   // Get games informations from the server
   const r = await getGameInfos();
   const rawGamesData = r.games;
   const rawGenresData = r.genres;

   // Create a separate array containing genre of every games
   const genreArray = denormalizeAssociativeTable(rawGenresData);

   console.log(rawGamesData);
   console.log(genreArray);

   function parseRawDbData(array, genreArray) {
      array.forEach((obj) => {
         const index = array.indexOf(obj);

         const parsedObj = {
            id: obj.game_id,
            name: obj.name,
            reviewScore: obj.review_score,
            genres: genreArray[index],
            imageUrl: null,
         };

         // Push parsed object into reactive games object
         gamesObject.push(parsedObj);
      });
   }

   parseRawDbData(rawGamesData, genreArray);

   console.log(gamesObject);
});

const gameListRows = [
   [
      {
         id: 1,
         name: 'test',
         reviewScore: 5,
         genres: ['t1', 'Té'],
         imageUrl:
            'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2842040/header.jpg?t=1740164681',
      },
      {
         id: 2,
         name: 'test1',
         reviewScore: 5,
         genres: ['t1', 'Té'],
         imageUrl:
            'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg?t=1734434803',
      },
      {
         id: 3,
         name: 'test2',
         reviewScore: 5,
         genres: ['t1', 'Té'],
         imageUrl:
            'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1681430/header.jpg?t=1741624420',
      },
   ],
];
</script>

<template>
   <div class="flex flex-col items-center justify-center gap-[45px] pt-[10rem]">
      <template v-for="row in gameListRows" :key="gameListRows.indexOf(row)">
         <div
            class="grid max-h-[350px] w-[80%] grid-cols-3 place-content-center place-items-center gap-[5rem]"
         >
            <div class="z-0 col-span-1 h-[218px] w-[379px] shadow-2xl">
               <div
                  class="flex h-[80%] flex-row items-start justify-end rounded-t-xl bg-cover p-2"
                  :style="{ 'background-image': 'url(' + row[0].imageUrl + ')' }"
               >
                  <Bookmark
                     size="24"
                     color="white"
                     stroke-width="2.3"
                     class="z-10 drop-shadow-2xl"
                  />
               </div>
               <div class="bg-bg3 relative z-10 h-[20%] rounded-b-xl">
                  <h1 class="text-md">{{ row[0].name }}</h1>
               </div>
            </div>
            <div class="z-0 col-span-1 h-[218px] w-[379px] shadow-2xl">
               <div
                  class="flex h-[80%] flex-row items-start justify-end rounded-t-xl bg-cover p-2"
                  :style="{ 'background-image': 'url(' + row[1].imageUrl + ')' }"
               >
                  <Bookmark
                     size="24"
                     color="white"
                     stroke-width="2.3"
                     class="z-10 drop-shadow-2xl"
                  />
               </div>
               <div class="bg-bg3 relative z-10 h-[20%] rounded-b-xl">
                  <h1 class="text-md">{{ row[1].name }}</h1>
               </div>
            </div>
            <div class="z-0 col-span-1 h-[218px] w-[379px] shadow-2xl">
               <div
                  class="flex h-[80%] flex-row items-start justify-end rounded-t-xl bg-cover p-2"
                  :style="{ 'background-image': 'url(' + row[2].imageUrl + ')' }"
               >
                  <Bookmark
                     size="24"
                     color="white"
                     stroke-width="2.3"
                     class="z-10 drop-shadow-2xl"
                  />
               </div>
               <div class="bg-bg3 relative z-10 h-[20%] rounded-b-xl">
                  <h1 class="text-md">{{ row[2].name }}</h1>
               </div>
            </div>
         </div>
      </template>
   </div>
</template>

<style scoped></style>
