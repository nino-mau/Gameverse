<script setup>
/*==============================
===========  IMPORTS  ==========
===============================*/

// vue
import { onMounted, reactive } from 'vue';

// libs
import { useUserStore } from '@/stores/userStore.js';

// icons
import { SquareX } from 'lucide-vue-next';

// function
import { getImageUrl } from '@/composable/general';

/*==============================
============  MAIN  ============
===============================*/

const userStore = useUserStore(); // Setup user auth store

const favGamesDetails = reactive([]); // Reactive array of objects of current user fav games details

onMounted(async () => {
   const r = await userStore.getFavGamesDetails();
   favGamesDetails.splice(0, favGamesDetails.length, ...r);
   console.log(favGamesDetails);
});
</script>

<template>
   <div class="bg-bg2 flex h-full w-full flex-col rounded-2xl p-10">
      <h1 class="mb-2 text-xl font-semibold opacity-75">Favorite games</h1>
      <hr />
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
                  <img
                     class="z-10 h-[85%] w-[95%] rounded-md"
                     :src="getImageUrl('games-list', game.image_name)"
                  />
               </div>
            </swiper-slide>
         </swiper-container>
      </div>
      <h1 class="mb-2 text-xl font-semibold opacity-75">Ranks</h1>
      <hr />
   </div>
</template>

<style scoped></style>
