<script setup>
// vue
import { onMounted, reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// primevue
import { Divider, Slider, SelectButton, Button, Select, Textarea, InputNumber } from 'primevue';
import { useToast } from 'primevue/usetoast';

// libs
import { useUserStore } from '@/stores/userStore.js';

// icons
import { SquareX, ArrowBigUp, Check } from 'lucide-vue-next';

// functions
import { getImageUrlDeep, getImageUrl } from '@/composable/general';

/*==============================
============  MAIN  ============
===============================*/

// Init services and store
const toast = useToast();
const router = useRouter();
const userStore = useUserStore();

//***===== State =====***//

// Store game data retreived from server
const favGamesDetails = reactive([]);
const favGamesSettings = reactive([]);
const selectedGame = ref({
   id: null,
   name: null,
   imageName: null,
});

// Store value of selected game
const hoursPlayedValue = ref();
const completionValue = ref();
const commentValue = ref();
const rankValue = ref({ name: null, imageUrl: null });
const skillLevelOptions = ref(['Casual', 'Intermediate', 'Good', 'Expert', 'Pro']);
const skillLevelValue = ref(selectedGame.value.skillLevel);

// Store values for ranks selection button
const gameRanksSelection = ref([]);

//***===== Functions =====***//

// Check if the game has ranks array
const selectedGameHasRanks = computed(() => {
   if (!selectedGame.value.id) return false;

   const isRanked = favGamesDetails.some((obj) => {
      return obj.game_id === selectedGame.value.id && obj.ranks !== null;
   });

   console.log(isRanked ? 'Selected game has ranks' : 'Selected game does not have ranks');
   return isRanked;
});

// Initialize game ranks selection button
function initRankSelect(rankSettingValue) {
   // Store custom classes for different game's rank icons
   const classHashMap = {
      default: 'scale-100',
      104: 'h-[20px] w-[40px]',
      150: 'h-[40px] w-[50px]',
      151: 'h-[20px] w-[50px]',
      116: 'scale-100',
      122: 'scale-78',
      126: 'scale-105',
   };

   // clear array and create unranked option
   gameRanksSelection.value.splice(0, gameRanksSelection.value.length);
   gameRanksSelection.value.push({
      name: 'Unranked',
      imageUrl: getImageUrl('game-ranks', 'default.webp'),
      class: classHashMap.default,
   });

   // make default value as unranked
   rankValue.value.name = 'Unranked';
   rankValue.value.imageUrl = getImageUrl('game-ranks', 'default.webp');
   rankValue.value.class = classHashMap.default;

   const game = favGamesDetails.find((obj) => obj.game_id === selectedGame.value.id);
   const ranks = game.ranks;
   const id = game.game_id;

   if (ranks) {
      ranks.forEach((item) => {
         // Create Url object to img correspodning to rank using util composable
         const parentFolder = 'game-ranks';
         const imgFolder = `${id}`;
         const imgName = `${ranks.indexOf(item)}.webp`;

         // Init selected rank value
         if (rankSettingValue !== null && item === rankSettingValue) {
            rankValue.value.name = item;
            rankValue.value.imageUrl = getImageUrlDeep(parentFolder, imgFolder, imgName);
            rankValue.value.class = classHashMap[id];
         }
         gameRanksSelection.value.push({
            name: item,
            imageUrl: getImageUrlDeep(parentFolder, imgFolder, imgName),
            class: classHashMap[id],
         });
      });
   }
}

// Update UI when a game is selected
async function handleGameSelect(gameId, gameName, gameImageName) {
   favGamesSettings.forEach((obj) => {
      if (obj.game_id === gameId) {
         selectedGame.value = {
            id: gameId,
            name: gameName,
            imageName: gameImageName,
         };
         hoursPlayedValue.value = obj.hours_played;
         completionValue.value = obj.completion;
         skillLevelValue.value = obj.skill_level;
         commentValue.value = obj.comment;

         initRankSelect(obj.rank); // init rank select component and value
      }
   });

   // Call server to update games data
   const r2 = await userStore.getFavGamesSettings();
   favGamesSettings.splice(0, favGamesSettings.length, ...r2);
}

// Call the server to save settings in input
async function addGameSettingWrapper(gameId, fieldName, fieldValue) {
   const r = await userStore.addFavoriteGameSettings(gameId, fieldName, fieldValue);

   console.log(r);

   if (!r.success) {
      console.log('addGameSettingWrapper: Error adding game setting:', r.error);
      toast.add({
         severity: 'error',
         summary: 'Error',
         detail: r.error,
         life: 3000,
      });
   } else if (r.success) {
      toast.add({
         severity: 'success',
         summary: 'Success',
         detail: 'Setting succesfuly saved',
         life: 3000,
      });
   }
}

// Call the server endpoint to remove fav then update fav games data
async function removeFavGameWrapper(gameId, gameName) {
   const r = await userStore.removeFavoriteGame(gameId, gameName);

   if (r) {
      // Update favorite games list and game details
      const r1 = await userStore.getFavGamesDetails();
      favGamesDetails.splice(0, favGamesDetails.length, ...r1);

      // clear selected game
      selectedGame.value = { id: null, name: null, imageName: null };
   }
}

//***===== Lifecycle =====***//

onMounted(async () => {
   // Get the user favorites games data (name, id) from server
   const r1 = await userStore.getFavGamesDetails();
   favGamesDetails.splice(0, favGamesDetails.length, ...r1);

   const r2 = await userStore.getFavGamesSettings(); // Time played, rank, skill level, completion...
   favGamesSettings.splice(0, favGamesSettings.length, ...r2);
});
</script>

<template>
   <div class="flex h-full w-full flex-col items-center justify-around">
      <!-- Favorite Game Selection -->
      <div
         class="bg-bg2 flex h-[33%] w-full flex-col rounded-2xl p-10"
         v-if="favGamesDetails.length > 0"
      >
         <Divider align="left" type="solid" class="m-0 text-white">
            <b class="bg-bg2 p-2 text-2xl font-bold text-white">Favorite games</b>
         </Divider>

         <!-- Game Card Slider -->
         <div class="mt-9">
            <swiper-container
               pagination="true"
               space-between="10"
               slides-per-view="4"
               speed="500"
               class="h-[12rem]"
            >
               <swiper-slide
                  v-for="game in favGamesDetails"
                  :key="game"
                  class="h-[77%] w-[15rem] drop-shadow-2xl"
               >
                  <div
                     class="bg-primary flex h-[100%] flex-col items-center justify-center rounded-md pb-1.5 text-white"
                  >
                     <div
                        class="flex h-[20%] w-full flex-row items-center justify-between pr-[5px] pl-[7px]"
                     >
                        <h1 class="text-sm font-semibold drop-shadow-2xl">{{ game.name }}</h1>
                        <SquareX
                           size="20"
                           color="white"
                           class="hover:stroke-invalid cursor-pointer drop-shadow-2xl"
                           @click="removeFavGameWrapper(game.game_id, game.name)"
                        />
                     </div>
                     <div class="h-[85%] w-[95%] overflow-hidden">
                        <img
                           class="z-10 h-full w-full cursor-pointer rounded-md transition hover:scale-110"
                           :src="getImageUrl('games-list', game.image_name)"
                           @click="handleGameSelect(game.game_id, game.name, game.image_name)"
                           v-ripple
                        />
                     </div>
                  </div>
               </swiper-slide>
            </swiper-container>
         </div>
      </div>
      <div class="bg-bg2 flex h-[33%] w-full flex-col items-center rounded-2xl p-10" v-else>
         <div class="m-auto">
            <h1 class="rounded-md border-2 p-2 text-3xl font-semibold text-white">
               NO FAVORITE GAMES
            </h1>
            <p class="mt-5 text-white">
               You can add games to favorite on
               <a
                  class="text-primary cursor-pointer hover:underline"
                  @click="router.push('/browse')"
                  >this page</a
               >
            </p>
         </div>
      </div>

      <!-- Game Settings -->
      <div
         class="bg-bg2 min-w flex max-h-[63%] w-[80%] flex-grow flex-col items-center justify-center overflow-hidden rounded-2xl p-8"
      >
         <div v-if="selectedGame.name !== null">
            <!-- Header -->
            <div role="heading" class="h-[10%]">
               <Divider align="center" type="solid" class="m-0 text-white">
                  <b class="bg-bg2 p-2 text-3xl font-bold text-white">
                     <transition name="fade" mode="out-in">
                        <span :key="selectedGame.name" class="text-primary">{{
                           selectedGame.name
                        }}</span>
                     </transition>

                     | <span class="font-semibold">Settings</span></b
                  >
               </Divider>
            </div>

            <!-- Settings Form -->
            <div class="bg-bg2 h-[100%] rounded-md transition">
               <div class="grid h-[60%] grid-cols-2">
                  <!-- Inputs -->
                  <div class="col-span-1 flex flex-col gap-5 p-10 pr-0 pb-0 pl-0">
                     <!-- Input 1 -->
                     <div class="flex flex-col gap-2">
                        <label for="timePlayed" class="text-md font-semibold">Time Played</label>
                        <div class="flex flex-row gap-5">
                           <InputNumber
                              id="timePlayed"
                              v-model="hoursPlayedValue"
                              suffix=" hours"
                              class="w-[50%]"
                           />
                           <Button
                              iconPos="right"
                              class="border-2 hover:text-white"
                              @click="
                                 addGameSettingWrapper(
                                    selectedGame.id,
                                    'hours_played',
                                    hoursPlayedValue,
                                 )
                              "
                           >
                              <template #icon>
                                 <Check size="25" />
                              </template>
                           </Button>
                        </div>
                     </div>
                     <!-- Input 2 -->
                     <div class="flex flex-col gap-2">
                        <label for="completion" class="text-md font-semibold">Completion</label>
                        <div class="flex flex-row gap-5">
                           <div class="w-[50%]">
                              <InputNumber
                                 id="timePlayed"
                                 v-model="completionValue"
                                 suffix=" %"
                                 variant="outlined"
                                 class="custom-input mb-4 w-full"
                              />
                              <Slider id="completion" v-model="completionValue" />
                           </div>
                           <Button
                              iconPos="right"
                              class="border-2 hover:text-white"
                              @click="
                                 addGameSettingWrapper(
                                    selectedGame.id,
                                    'completion',
                                    completionValue,
                                 )
                              "
                           >
                              <template #icon>
                                 <Check size="25" />
                              </template>
                           </Button>
                        </div>
                     </div>
                     <!-- Input 3 -->
                     <div v-if="selectedGameHasRanks" class="flex flex-col gap-2">
                        <label for="selectRank" class="text-md font-semibold">Rank</label>
                        <div class="flex flex-row gap-5">
                           <Select
                              id="selectRank"
                              v-model="rankValue"
                              :options="gameRanksSelection"
                              optionLabel="name"
                              placeholder="Select your rank"
                              class="flex h-[50px] w-[50%] flex-row items-center justify-center"
                           >
                              <!-- Custom Template -->
                              <template #value="slotProps">
                                 <div
                                    v-if="slotProps.value"
                                    class="flex max-h-[40px] min-h-[35px] max-w-[40px] min-w-[35px] items-center gap-2"
                                 >
                                    <!-- Ranks Icon -->
                                    <transition name="bounce" mode="out-in">
                                       <img
                                          :key="slotProps.value.imageUrl"
                                          :src="slotProps.value.imageUrl"
                                          :class="slotProps.value.class"
                                          alt="Rank icon"
                                       />
                                    </transition>

                                    <span>{{ slotProps.value.name }}</span>
                                 </div>
                                 <span v-else>{{ slotProps.placeholder }}</span>
                              </template>
                              <template #option="slotProps">
                                 <div class="flex max-h-[40px] max-w-[40px] items-center gap-2">
                                    <!-- Ranks Icon -->
                                    <img
                                       :src="slotProps.option.imageUrl"
                                       :class="slotProps.option.class"
                                       alt="Rank icon"
                                    />
                                    <span>{{ slotProps.option.name }}</span>
                                 </div>
                              </template>
                           </Select>

                           <Button
                              label="Save"
                              iconPos="right"
                              class="border-2 hover:text-white"
                              @click="
                                 addGameSettingWrapper(selectedGame.id, 'rank', rankValue.name)
                              "
                           >
                              <template #icon>
                                 <Check size="25" />
                              </template>
                           </Button>
                        </div>
                     </div>
                     <!-- Input 4 -->
                     <div class="flex flex-col gap-2">
                        <label for="comment" class="text-md font-semibold">Comment</label>
                        <div class="flex flex-row gap-5">
                           <Textarea
                              id="comment"
                              v-model="commentValue"
                              class="w-[50%]"
                              rows="2"
                              cols="30"
                           />
                           <Button
                              iconPos="right"
                              class="border-2 hover:text-white"
                              @click="
                                 addGameSettingWrapper(selectedGame.id, 'comment', commentValue)
                              "
                           >
                              <template #icon>
                                 <Check size="25" />
                              </template>
                           </Button>
                        </div>
                     </div>
                  </div>

                  <!-- Illustration & Buttons -->
                  <div class="col-span-1 flex flex-col justify-between gap-5 p-10 pr-0 pb-0 pl-0">
                     <!-- Illustration -->
                     <div class="min-h-[200px]">
                        <transition name="bounce" mode="out-in">
                           <img
                              :key="selectedGame.imageName"
                              :src="getImageUrl('games-list', selectedGame.imageName)"
                              class="rounded-xl drop-shadow-2xl"
                           />
                        </transition>
                     </div>
                     <!-- Multi Buttons -->
                     <div class="flex flex-col items-center">
                        <div class="card flex flex-col justify-center">
                           <h1 class="text-md mb-2 font-semibold">Level</h1>
                           <SelectButton
                              v-model="skillLevelValue"
                              :options="skillLevelOptions"
                              class="bg-bg2 border-1 border-white"
                              :multiple="false"
                              aria-labelledby="single"
                           />
                           <Button
                              iconPos="right"
                              class="mt-5 w-[25%] self-center border-[2px] hover:text-white"
                              @click="
                                 addGameSettingWrapper(
                                    selectedGame.id,
                                    'skill_level',
                                    skillLevelValue,
                                 )
                              "
                           >
                              <template #icon>
                                 <Check size="25" />
                              </template>
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <!-- Game Settings Placeholder -->
         <div
            v-else-if="favGamesDetails.length !== 0"
            class="flex flex-col items-center justify-center"
         >
            <ArrowBigUp size="60" stroke-width="1" fill="white" />

            <h1
               :key="favGamesDetails.length"
               class="m-auto inline-flex items-center gap-2 p-2 text-3xl font-semibold text-white"
            >
               SELECT A GAME
            </h1>
         </div>
         <div v-else class="flex items-center justify-center">
            <h1 class="m-auto rounded-md border-2 p-2 text-3xl font-semibold text-white">
               NO FAVORITE GAMES
            </h1>
         </div>
      </div>
   </div>
</template>

<style scoped>
/* Custom style for prime vue inputs components */
:deep(.p-inputtext) {
   background-color: transparent;
   color: white;
}
:deep(.p-textarea) {
   background-color: transparent;
   color: white;
}
:deep(.p-select) {
   background-color: transparent;
   color: white;
}
</style>
