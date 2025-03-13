<script setup>
/*==============================
===========  IMPORTS  ==========
===============================*/

// libs
import { useUserStore } from '@/stores/userStore.js';
import Swiper from 'swiper/bundle';

// primevue
import { Avatar } from 'primevue';
import FileUpload from 'primevue/fileupload';

// icons
import IconCircleUserProfile from '../icons/IconCircleUserProfile.vue';
import { SquareX } from 'lucide-vue-next';

/*==============================
============  MAIN  ============
===============================*/

// const userStore = useUserStore(); // Setup user auth store

//***===== Favorite Games Slider =====***//

// Init swiper
// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.fav-games-swiper', {
   loop: true,
   slidesPerView: '2',
   spaceBetween: 110,
});
</script>

<template>
   <div class="bg-bg2 flex h-full w-full flex-col rounded-2xl p-10">
      <h1 class="mb-2 text-xl font-semibold opacity-75">Owned games</h1>
      <hr />
      <h1 class="mb-2 text-xl font-semibold opacity-75">Favorite games</h1>
      <hr />
      <div class="mt-10">
         <swiper-container
            pagination="true"
            space-between="25"
            slides-per-view="4"
            speed="500"
            class="h-[16rem]"
         >
            <swiper-slide class="h-[80%] w-[15rem] drop-shadow-2xl">
               <img class="h-[80%] rounded-t-md" src="@/assets/img/games-list/header-2.webp" />
               <div
                  class="text-secondary flex h-[20%] flex-row items-center justify-between rounded-b-md bg-white pr-2 pl-2"
               >
                  <h1 class="text-md font-bold">Gamename</h1>
                  <SquareX size="30" color="var(--color-secondary)" class="hover:fill-btn-active" />
               </div>
            </swiper-slide>
            <swiper-slide class="h-[75%] w-[15rem]">
               <img class="h-full rounded-xl" src="@/assets/img/games-list/header-2.webp" />
            </swiper-slide>
            <swiper-slide class="h-[75%] w-[15rem]">
               <img class="h-full rounded-xl" src="@/assets/img/games-list/header-2.webp" />
            </swiper-slide>
            <swiper-slide class="h-[75%] w-[15rem]">
               <img class="h-full rounded-xl" src="@/assets/img/games-list/header-2.webp" />
            </swiper-slide>
            <swiper-slide class="h-[75%] w-[15rem]">
               <img class="h-full rounded-xl" src="@/assets/img/games-list/header-2.webp" />
            </swiper-slide>
            <swiper-slide class="h-[75%] w-[15rem]">
               <img class="h-full rounded-xl" src="@/assets/img/games-list/header-2.webp" />
            </swiper-slide>
         </swiper-container>
      </div>
      <h1 class="mb-2 text-xl font-semibold opacity-75">Ranks</h1>
      <hr />
   </div>
</template>

<style scoped></style>
