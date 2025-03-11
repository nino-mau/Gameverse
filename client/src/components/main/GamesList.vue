<script setup>
// #### IMPORT ####

// Vue
import { reactive, onMounted, ref, watch } from 'vue';

// Prime vue
import { Select } from 'primevue';

// Libs
import lodash from 'lodash';

// Icons
import { Bookmark } from 'lucide-vue-next';
import { Star } from 'lucide-vue-next';

// Functions
import { getData } from '@/utils/api';
import { denormalizeAssociativeTable } from '@/utils/general';

// #### LOGIC ####

// ** Filter/Sort Buttons Setup **

// Genres
const selectedGenres = ref();
const genresFilterList = ref([
   { name: 'Action' },
   { name: 'Adventure' },
   { name: 'RPG' },
   { name: 'Free to play' },
   { name: 'MMO' },
   { name: 'Simulation' },
   { name: 'Sports' },
   { name: 'Casual' },
   { name: 'Indie' },
   { name: 'Strategy' },
   { name: 'Racing' },
]);

// Sort
// const selectedSortOptions = ref();
// const sortOptionsList = ref([]);

// Handle setting color depending on review score for text
function handleReviewScoreColor(reviewScore) {
   if (reviewScore > 7) {
      return 'text-review-best';
   } else if (reviewScore <= 7 && reviewScore >= 6) {
      return 'text-review-average';
   } else {
      return 'text-review-bad';
   }
}

// Handle setting color depending on review score for icons
function handleReviewIconColor(reviewScore) {
   if (reviewScore > 7) {
      return 'var(--color-review-best)';
   } else if (reviewScore <= 7 && reviewScore >= 6) {
      return 'var(--color-review-average)';
   } else {
      return 'var(--color-review-bad)';
   }
}

// Make get request to server for specific games info needed on this page
async function getGameInfos() {
   try {
      const gamesData = await getData('https://gameverse.local/api/games/');
      return { games: gamesData.games, genres: gamesData.genres };
   } catch (err) {
      console.log('GetGameInfos: error fetching games data:', err);
   }
}

// Parse all the data together, apply filters, divide the array into rows of 3 and place it in a reactive array for use in template
function parseRawDbData(array, genreArray) {
   const fullGameArray = [];

   array.forEach((obj) => {
      const index = array.indexOf(obj);

      const parsedObj = {
         id: obj.game_id,
         name: obj.name,
         reviewScore: obj.review_score,
         genres: genreArray[index],
         imageUrl: new URL(`../../assets/img/games-list/${obj.image_name}`, import.meta.url).href,
      };

      // Push parsed object into new array
      fullGameArray.push(parsedObj);
   });
   // Split this array in chunks of 3 then push it in the reactive array
   gameRowsArray.push(...lodash.chunk(fullGameArray, 3));
}

// function filterArray(targetArr, filterArr) {
//    console.log('Initial:', targetArr);
//    targetArr.forEach((chunk) => {
//       chunk.forEach((obj) => {
//          const index = targetArr.indexOf(obj);
//          if (!obj.genres.includes(filterArr)) {
//             delete targetArr[index];
//          }
//       });
//    });

//    console.log(targetArr);
//    // Clear gameRowsArray and place target array in it's place
//    gameRowsArray.length = 0;
//    gameRowsArray.push(...targetArr);
// }

function filterArray(originalArray, selectedGenres) {
   // If no genres selected, return the original array
   if (!selectedGenres || selectedGenres.length === 0) {
      return originalArray;
   }

   let genreNames = [];

   // Extract only the genre names from the selected objects
   if (Array.isArray(selectedGenres)) {
      genreNames = selectedGenres.map((genre) => genre.name);
   } else {
      genreNames = [selectedGenres.name];
   }

   console.log('selected genre', selectedGenres);

   // Create a new filtered array of games
   const filteredGames = originalArray.flat().filter((game) => {
      // Check if at least one of the game's genres matches any selected genre
      return game.genres.some((genre) => genreNames.includes(genre));
   });

   // Regroup into chunks of 3
   const filteredRows = lodash.chunk(filteredGames, 3);

   console.log(filteredRows);

   // Clear and update the reactive array
   gameRowsArray.length = 0;
   gameRowsArray.push(...filteredRows);
}

// Create the reactive object which will store games infos
const gameRowsArray = reactive([]);

// Create variable storing fetched game data;
// const rawGamesData = [];
// const rawGenresData = [];

onMounted(async () => {
   // Get games informations from the server
   const r = await getGameInfos();

   // rawGamesData.push(r.games);
   // rawGenresData.push(r.genres);

   const rawGamesData = r.games;
   const rawGenresData = r.genres;

   // Parse the genre data into a separate array of arrays where each array correspond to one game
   const genreArray = denormalizeAssociativeTable(rawGenresData);

   // Parse all the data and create chunks
   parseRawDbData(rawGamesData, genreArray);
});

watch(selectedGenres, () => {
   filterArray(gameRowsArray, selectedGenres.value);
});
</script>

<template>
   <div class="mt-[10rem] w-[83%]">
      <!-- Games List Menu -->
      <div class="mb-15 flex flex-row justify-start gap-10">
         <!-- Select genres button -->
         <Select
            v-model="selectedGenres"
            :options="genresFilterList"
            optionLabel="name"
            placeholder="Genres..."
            class="bg-secondary w-[17rem] border-2 text-xl text-[#ffffff]"
            :maxSelectedLabels="1"
            showClear
            outlined
         >
         </Select>
         <!-- Sort button -->
         <!-- <MultiSelect
            v-model="selectedSortOptions"
            :options="sortOptionsList"
            optionLabel="name"
            placeholder="Sort..."
            class="bg-secondary w-[10rem] border-2 text-xl text-white"
         >
         </MultiSelect> -->
      </div>

      <!-- Games List -->
      <div class="flex flex-col items-center justify-center gap-[45px]">
         <!-- Row -->
         <div
            v-for="row in gameRowsArray"
            :key="row"
            class="grid max-h-[350px] grid-cols-3 place-content-center place-items-center gap-[1.5rem]"
         >
            <!-- Cell -->
            <div
               v-for="obj in row"
               :key="obj.id"
               class="z-0 col-span-1 h-[218px] w-[379px] shadow-2xl"
            >
               <div
                  class="relative flex h-[80%] flex-row items-start justify-end rounded-t-xl bg-cover p-2"
                  :style="{ backgroundImage: `url(${obj.imageUrl})` }"
               >
                  <Bookmark
                     size="24"
                     color="white"
                     stroke-width="2.3"
                     class="z-10 drop-shadow-2xl"
                  />
               </div>
               <div class="bg-bg3 flex h-[20%] flex-row items-center justify-between rounded-b-xl">
                  <h1 class="text-md ml-3 font-semibold">{{ obj.name }}</h1>
                  <span class="mr-3 flex flex-row items-center gap-[5px]">
                     <Star
                        size="19"
                        strokeWidth="0"
                        :fill="handleReviewIconColor(obj.reviewScore)"
                     />
                     <p class="text-md" :class="handleReviewScoreColor(obj.reviewScore)">
                        {{ obj.reviewScore }}
                     </p>
                  </span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped></style>
