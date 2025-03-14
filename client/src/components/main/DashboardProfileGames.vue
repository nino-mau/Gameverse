<script setup>
/*==============================
===========  IMPORTS  ==========
===============================*/

// vue
import { onMounted, reactive, ref, computed } from 'vue';

// primevue
import { Divider, InputText, Slider, SelectButton, Button, Select } from 'primevue';

// libs
import { useUserStore } from '@/stores/userStore.js';

// icons
import { SquareX } from 'lucide-vue-next';

// function
import { getImageUrl } from '@/composable/general';

/*==============================
============  MAIN  ============
===============================*/

//***===== State =====***//

const userStore = useUserStore(); // Setup user auth store

const favGamesDetails = reactive([]); // Reactive array of objects of current user fav games details

const favGamesSettings = reactive([]); // Reactive array of objects of current user fav games settings

// Reactive object with details on the game currently selected
const selectedGame = ref({
   name: null,
   imageName: null,
   hoursPlayed: null,
   completion: null,
   skillLevel: null,
   comment: null,
   rank: null,
});

// ** Handle Completion ** //

// Handle completion value in input
const completionValue = ref(selectedGame.value.completion);

// Add percentage symbol to completion number
const formattedCompletion = computed(() => `${completionValue.value}%`);

// ** Handle Skill Level ** //

const skillLevelOptions = ref(['Casual', 'Intermediate', 'Good', 'Expert', 'Pro']); // Init skill level select buttons

const skillLevelValue = ref(selectedGame.value.skillLevel); // Defaut value

//***===== Functions =====***//

function handleGameSelect(gameId, gameName, gameImageName) {
   favGamesSettings.forEach((obj) => {
      if (obj.game_id === gameId) {
         selectedGame.value = {
            name: gameName,
            imageName: gameImageName,
            hoursPlayed: obj.hours_played,
            comment: obj.comment,
            rank: obj.rank,
         };
         // Completion and skill level are updated differently since they behave differently
         completionValue.value = obj.completion;
         skillLevelValue.value = obj.skill_level;
      }
   });
   console.log(selectedGame);
}

//***===== Lifecycle =====***//

onMounted(async () => {
   const r1 = await userStore.getFavGamesDetails();
   favGamesDetails.splice(0, favGamesDetails.length, ...r1);

   const r2 = await userStore.getFavGamesSettings();
   favGamesSettings.splice(0, favGamesSettings.length, ...r2);
   console.log(favGamesSettings);
});
</script>

<template>
   <div class="flex h-full w-full flex-col items-center justify-around">
      <!-- **** Select Game Section ***** -->
      <div class="bg-bg2 flex h-[33%] w-full flex-col rounded-2xl p-10">
         <Divider align="left" type="solid" class="m-0 text-white">
            <b class="bg-bg2 p-2 text-2xl font-bold text-white">Favorite games</b>
         </Divider>

         <!-- **** SLIDER ***** -->
         <div class="mt-10">
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
                        />
                     </div>
                     <div class="h-[85%] w-[95%] overflow-hidden">
                        <img
                           class="z-10 h-full w-full cursor-pointer rounded-md transition hover:scale-110"
                           :src="getImageUrl('games-list', game.image_name)"
                           @click="handleGameSelect(game.game_id, game.name, game.image_name)"
                        />
                     </div>
                  </div>
               </swiper-slide>
            </swiper-container>
         </div>
      </div>

      <!-- **** Game Stat Section ***** -->
      <div class="bg-bg2 flex w-[80%] flex-col rounded-2xl p-10">
         <div v-if="selectedGame.name !== null">
            <!-- **** HEADER **** -->
            <div role="heading" class="h-[10%]">
               <Divider align="center" type="solid" class="m-0 text-white">
                  <b class="bg-bg2 p-2 text-3xl font-bold text-white"
                     ><span class="text-primary">{{ selectedGame.name }}</span> |
                     <span class="font-semibold">Settings</span></b
                  >
               </Divider>
               <!-- <h1 class="text-center text-3xl font-bold">
                  <span class="text-primary">{{ selectedGame.name }}</span> |
                  <span class="font-semibold">Settings</span>
               </h1> -->
            </div>

            <!-- **** PARAMS ***** -->
            <div class="bg-bg2 h-[90%] rounded-md transition">
               <div class="grid h-[60%] grid-cols-2">
                  <!-- FORM SECTION 1 -->
                  <div class="col-span-1 flex flex-col gap-5 p-8 pr-0 pl-0">
                     <!-- Input 1 -->
                     <div class="flex flex-col gap-2">
                        <label for="timePlayed" class="text-md font-semibold">Time Played</label>
                        <div class="flex flex-row gap-5">
                           <InputText
                              id="timePlayed"
                              :value="selectedGame.hoursPlayed + ' hours'"
                              v-model="timePlayedValue"
                              class="w-[50%]"
                           />
                           <Button
                              label="Save"
                              icon="pi pi-check"
                              iconPos="right"
                              class="hover:text-white"
                           />
                        </div>
                     </div>
                     <!-- Input 2 -->
                     <div class="flex flex-col gap-2">
                        <label for="completion" class="text-md font-semibold">Completion</label>
                        <div class="flex flex-row gap-5">
                           <div class="w-[50%]">
                              <InputText :value="formattedCompletion" class="mb-4 w-full" />
                              <Slider id="completion" v-model="completionValue" />
                           </div>
                           <Button
                              label="Save"
                              icon="pi pi-check"
                              iconPos="right"
                              class="hover:text-white"
                           />
                        </div>
                     </div>
                     <!-- Input 3 -->
                     <div v-if="selectedGame.rank !== null" class="flex flex-col gap-2">
                        <label for="selectRank" class="text-md font-semibold">Rank</label>
                        <div class="flex flex-row gap-5">
                           <Select
                              id="selectRank"
                              v-model="selectedCity"
                              :options="cities"
                              optionLabel="name"
                              placeholder="Select a City"
                              class="w-[50%]"
                           />

                           <Button
                              label="Save"
                              icon="pi pi-check"
                              iconPos="right"
                              class="hover:text-white"
                           />
                        </div>
                     </div>
                     <!-- Input 4 -->
                     <div class="flex flex-col gap-2">
                        <label for="comment" class="text-md font-semibold">Comment</label>
                        <div class="flex flex-row gap-5">
                           <Textarea
                              id="comment"
                              v-model="value"
                              :value="selectedGame.comment"
                              class="w-[50%] rounded-md bg-white text-black"
                              rows="2"
                              cols="30"
                           />
                           <Button
                              label="Save"
                              icon="pi pi-check"
                              iconPos="right"
                              class="hover:text-white"
                           />
                        </div>
                     </div>
                  </div>

                  <!-- FORM SECTION 2 -->
                  <div
                     class="col-span-1 flex flex-col items-center justify-between gap-5 p-8 pr-0 pl-0"
                  >
                     <!-- Illustration -->
                     <img
                        :src="getImageUrl('games-list', selectedGame.imageName)"
                        class="rounded-xl drop-shadow-2xl"
                     />
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
                              label="Save"
                              icon="pi pi-check"
                              iconPos="right"
                              class="mt-5 w-[25%] self-center hover:text-white"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div v-else-if="favGamesDetails.length !== 0" class="flex items-center justify-center">
            <h1>SELECT A GAME</h1>
         </div>
         <div v-else class="flex items-center justify-center">
            <h1>NO FAVORITE GAMES</h1>
         </div>
      </div>
   </div>
</template>

<style scoped></style>
