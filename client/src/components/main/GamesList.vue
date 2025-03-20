<script setup>
// vue
import { reactive, onMounted, ref, markRaw } from 'vue';

// prime vue
import { Select } from 'primevue';
import { useToast } from 'primevue/usetoast';

// libs
import lodash from 'lodash';
import { useUserStore } from '@/stores/userStore.js';

// icons
import {
   Bookmark,
   Star,
   Swords,
   Compass,
   Wand2,
   Coins,
   Globe,
   Monitor,
   Dumbbell,
   Armchair,
   Sparkles,
   GraduationCap,
   Car,
   ChevronRight,
   Trophy,
} from 'lucide-vue-next';

// functions
import { getData } from '@/utils/api';
import { denormalizeAssociativeTable } from '@/utils/general';

/*==============================
============  MAIN  ============
===============================*/

// init service and store
const toast = useToast();
const userStore = useUserStore();

//***===== State =====***//

// Store genre filter options
const genresFilterList = ref([
   { name: 'Action', icon: markRaw(Swords) },
   { name: 'Adventure', icon: markRaw(Compass) },
   { name: 'RPG', icon: markRaw(Wand2) },
   { name: 'Free To Play', icon: markRaw(Coins) },
   { name: 'Competitive', icon: markRaw(Trophy) },
   { name: 'MMO', icon: markRaw(Globe) },
   { name: 'Simulation', icon: markRaw(Monitor) },
   { name: 'Sports', icon: markRaw(Dumbbell) },
   { name: 'Casual', icon: markRaw(Armchair) },
   { name: 'Indie', icon: markRaw(Sparkles) },
   { name: 'Strategy', icon: markRaw(GraduationCap) },
   { name: 'Racing', icon: markRaw(Car) },
]);
const sortOptionsList = ref([{ name: 'Best reviews' }, { name: 'Worst reviews' }]);

// Store games info data
const gameRowsArray = reactive([]);
const backupGameRowsArray = [];

//***===== Functions =====***//

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

// Make get request to server for all games info needed on this page
async function getGameInfos() {
   try {
      const gamesData = await getData('https://gameverse.local/api/games');
      return { games: gamesData.games, genres: gamesData.genres };
   } catch (err) {
      console.log('GetGameInfos: error fetching games data:', err);
   }
}

// Parse all the data together, apply filters, divide the array into rows of 3 and place it in a reactive array for use in template
function parseGamesData(array, genreArray) {
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
   // Create a backup
   backupGameRowsArray.push(...lodash.chunk(fullGameArray, 3));
}

// Filter array by genre
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

// Detect when a genre is selected or unselected
function onSelectGenreChange(event) {
   if (!event.value) {
      gameRowsArray.length = 0;
      gameRowsArray.push(...backupGameRowsArray);
   } else {
      gameRowsArray.length = 0;
      gameRowsArray.push(...backupGameRowsArray);
      filterArray(gameRowsArray, event.value);
   }
}

// Wrapper to trigger a toast popup on addFavoriteGame success
async function addFavoriteGameWrapper(gameId, gameName) {
   const r = await userStore.addFavoriteGame(gameId, gameName);

   if (r) {
      // Update user store with user favorite games
      await userStore.getFavGames();

      toast.add({
         severity: 'success',
         summary: 'Success',
         detail: 'Added game to favorites !',
         life: 2000,
      });
   }
}

// Call the server endpoint to remove fav then update fav games data
async function removeFavGameWrapper(gameId, gameName) {
   // optimistically update the favorite games state
   const index = userStore.userFavGames.indexOf(gameId);
   if (index > -1) {
      userStore.userFavGames.splice(index, 1);
   }

   const r = await userStore.removeFavoriteGame(gameId, gameName);

   if (r) {
      // Update user store with user favorite games
      await userStore.getFavGames();

      toast.add({
         severity: 'success',
         summary: 'Success',
         detail: 'Removed game to favorites !',
         life: 2000,
      });
   }
}

//***===== Lifecycle =====***//

onMounted(async () => {
   // Update user store with user favorite games
   await userStore.getFavGames();

   // Get games informations from the server
   const r2 = await getGameInfos();

   const rawGamesData = r2.games;
   const rawGenresData = r2.genres;

   // Parse the genre data into a separate array of arrays where each array correspond to one game
   const genreArray = denormalizeAssociativeTable(rawGenresData);

   // Parse all the data and create chunks
   parseGamesData(rawGamesData, genreArray);
});
</script>

<template>
   <div class="mt-[10rem] w-[83%]">
      <!-- Games List Menu -->
      <div class="mb-15 flex flex-row justify-start gap-10">
         <!-- Genre Select -->
         <Select
            v-model="selectedGenres"
            :options="genresFilterList"
            optionLabel="name"
            placeholder="Genres..."
            class="bg-secondary text-md w-[12.6rem] border-2 text-[#ffffff]"
            :maxSelectedLabels="1"
            showClear
            outlined
            @change="onSelectGenreChange"
         >
            <!-- Custom icons -->
            <template #value="slotProps">
               <div v-if="slotProps.value" class="flex items-center gap-2">
                  <component :is="slotProps.value.icon" :width="20" :height="20" />
                  <span>{{ slotProps.value.name }}</span>
               </div>
               <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
               <div class="flex items-center gap-2">
                  <component :is="slotProps.option.icon" :width="18" :height="18" />
                  <span>{{ slotProps.option.name }}</span>
               </div>
            </template>
         </Select>
         <!-- Sort Select -->
         <Select
            v-model="selectedSortOptions"
            :options="sortOptionsList"
            optionLabel="name"
            placeholder="Sort..."
            class="bg-secondary text-md w-[12rem] border-2 text-[#ffffff]"
            showClear
            outlined
         >
         </Select>
      </div>

      <!-- Games List Title -->
      <div class="mb-8 flex flex-row items-center">
         <h1 class="text-3xl font-semibold">Trending</h1>
         <ChevronRight size="32" strokeWidth="2.5" class="pt-[4px]" />
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
               class="cell-scale z-0 col-span-1 h-[218px] w-[379px] shadow-2xl transition hover:scale-105"
            >
               <!-- Image Section -->
               <div
                  class="relative flex h-[80%] flex-row items-start justify-end rounded-t-xl bg-cover p-2"
                  :style="{ backgroundImage: `url(${obj.imageUrl})` }"
               >
                  <a
                     @click="
                        userStore.userFavGames.includes(obj.id)
                           ? removeFavGameWrapper(obj.id, obj.name)
                           : addFavoriteGameWrapper(obj.id, obj.name)
                     "
                     class="cursor-pointer"
                  >
                     <Bookmark
                        size="24"
                        color="white"
                        stroke-width="2.3"
                        class="z-10 drop-shadow-2xl"
                        :class="{
                           'fill-white': userStore.userFavGames.includes(obj.id),
                           'hover:fill-white': !userStore.userFavGames.includes(obj.id),
                        }"
                     />
                  </a>
               </div>
               <!-- Text Section -->
               <div class="bg-bg4 flex h-[20%] flex-row items-center justify-between rounded-b-xl">
                  <!-- Game Title -->
                  <h1 class="text-md ml-3 align-baseline font-semibold">
                     {{ obj.name }} <span class="pl-[4px] text-white">|</span
                     ><span class="pl-2 text-xs text-white">{{
                        obj.genres[2] || obj.genres[1]
                     }}</span>
                  </h1>

                  <!-- Review -->
                  <span
                     class="game-review-container mr-3 grid grid-cols-2 place-content-center place-items-center"
                  >
                     <Star
                        size="18"
                        strokeWidth="0"
                        :fill="handleReviewIconColor(obj.reviewScore)"
                        class="p-auto col-span-1"
                     />
                     <p
                        class="col-span-1 text-xl font-semibold"
                        :class="handleReviewScoreColor(obj.reviewScore)"
                     >
                        {{ obj.reviewScore }}
                     </p>
                  </span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
/* Custom colors for select buttons icons  */
.p-select-clear-icon {
   color: white !important;
}
.p-select-dropdown {
   color: white !important;
}
</style>
