<script setup>
// *** Import Built-in Components
import { onMounted } from 'vue';

// *** Import PrimeVue Components ***
import Button from 'primevue/button';

// *** Import Modules ***
import Swiper from 'swiper/bundle';

// Create new swiper slider after DOM elements are loaded
onMounted(() => {
   // eslint-disable-next-line no-unused-vars
   const swiper = new Swiper('.lp4-games-swiper', {
      loop: true,
      slidesPerView: '5',
      spaceBetween: '1',
      centeredSlides: false,
      autoplay: {
         delay: 0,
      },
      speed: 10000,
   });
});
</script>

<template>
   <div class="lp4-container bg-bg4 h-[100vh] w-full pt-15 flex flex-col">
      <div class="flex flex-col justify-center items-center gap-5 pr-[25rem] pl-[25rem]">
         <h1 class="text-5xl/[1.6] font-bold text-center">
            Hundreds of games ready to be discovered !
         </h1>
         <p class="text-base text-center">
            Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis
            sit aliquam sit nullam neques.
         </p>
         <div>
            <Button
               class="bg-white text-bg4 border-white h-[45px] w-[150px] mr-5 active:bg-btn-active"
               label="Browse"
            />
            <Button
               class="bg-bg4 border-white text-white h-[45px] w-[150px] hover:bg-white hover:text-bg4 active:bg-btn-active"
               label="Learn more"
            />
         </div>
      </div>
      <div class="flex-1 flex justify-center items-center">
         <div class="lp4-games-swiper overflow-hidden">
            <div class="swiper-wrapper">
               <div class="swiper-slide swiper-slide-group1">
                  <img src="@/assets/img/games-thumbnails/bg3.webp" alt="Baldur's Gate 3" />
               </div>
               <div class="swiper-slide swiper-slide-group2">
                  <img src="@/assets/img/games-thumbnails/bloodborne.webp" alt="Bloodborne" />
               </div>
               <div class="swiper-slide swiper-slide-group1">
                  <img src="@/assets/img/games-thumbnails/bow.webp" alt="Breath Of The Wild" />
               </div>
               <div class="swiper-slide swiper-slide-group2">
                  <img src="@/assets/img/games-thumbnails/eldenring.webp" alt="Elden Ring" />
               </div>
               <div class="swiper-slide swiper-slide-group1">
                  <img src="@/assets/img/games-thumbnails/godofwar.webp" alt="God Of War" />
               </div>
               <div class="swiper-slide swiper-slide-group2">
                  <img
                     src="@/assets/img/games-thumbnails/persona5royal.webp"
                     alt="Persona 5 Royal"
                  />
               </div>
               <div class="swiper-slide swiper-slide-group1">
                  <img src="@/assets/img/games-thumbnails/rdr2.webp" alt="Red Dead Redemption 2" />
               </div>
               <div class="swiper-slide swiper-slide-group2">
                  <img
                     src="@/assets/img/games-thumbnails/tlouremastered.webp"
                     alt="The Last Of Us Remastered"
                  />
               </div>
               <div class="swiper-slide swiper-slide-group1">
                  <img src="@/assets/img/games-thumbnails/totk.webp" alt="Tears Of The Kingdom" />
               </div>
               <div class="swiper-slide swiper-slide-group2">
                  <img src="@/assets/img/games-thumbnails/tw3.webp" alt="The Witcher 3" />
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.lp4-games-swiper {
   > .swiper-wrapper {
      transition-timing-function: linear;
      > .swiper-slide {
         width: auto;
         height: 420px;
         > img {
            width: 268px;
            height: 350px;
            border-radius: var(--radius-md);
            box-shadow:
               0 10px 15px -3px rgb(0 0 0 / 0.1),
               0 4px 6px -4px rgb(0 0 0 / 0.1);
         }
      }
      > .swiper-slide-group1 {
         padding-bottom: 3rem;
      }
      > .swiper-slide-group2 {
         padding-top: 3rem;
      }
   }
}
</style>
