<script setup>
// *** Import Built-in Components
import { onMounted } from 'vue';

// *** Import Illustration ***
import IlluAllPlatforms1 from '../illustrations/IlluAllPlatforms1.vue';

// *** Import Icons ***
import IconSteam from '../icons/brands/IconSteam.vue';
import IconXbox from '../icons/brands/IconXbox.vue';
import IconSteamdeck from '../icons/brands/IconSteamdeck.vue';
import IconStadia from '../icons/brands/IconStadia.vue';
import IconShadow from '../icons/brands/IconShadow.vue';
import IconRogAlly from '../icons/brands/IconRogAlly.vue';
import IconPlaystation from '../icons/brands/IconPlaystation.vue';
import IconLinuxMint from '../icons/brands/IconLinuxMint.vue';
import IconGog from '../icons/brands/IconGog.vue';
import IconEpicGames from '../icons/brands/IconEpicGames.vue';
import IconAndroid from '../icons/brands/IconAndroid.vue';

// *** Import Modules ***
import Swiper from 'swiper/bundle';

// Create new swiper slider after DOM elements are loaded
onMounted(() => {
   // eslint-disable-next-line no-unused-vars
   const swiper = new Swiper('.brands-swiper', {
      loop: true,
      slidesPerView: '10',
      spaceBetween: 110,
      autoplay: {
         delay: 0,
      },
      speed: 5000,
   });
});
</script>

<template>
   <div class="lp3-container flex flex-col items-center">
      <h1 class="title text-5xl font-bold">
         Available On <span class="title-highlight-section">All Platforms !</span>
      </h1>
      <div class="brands-swiper mt-[5rem]">
         <div class="swiper-wrapper">
            <div class="swiper-slide">
               <IconXbox svg-class="brands-icons" svg-color="#ffffff" />
            </div>
            <div class="swiper-slide">
               <IconSteamdeck svg-class="brands-icons" svg-color="#ffffff" />
            </div>
            <div class="swiper-slide">
               <IconStadia svg-class="brands-icons" svg-color="#ffffff" />
            </div>
            <div class="swiper-slide">
               <IconShadow svg-class="brands-icons" svg-color="#ffffff" />
            </div>
            <div class="swiper-slide">
               <IconRogAlly svg-class="brands-icons" svg-color="#ffffff" />
            </div>
            <div class="swiper-slide">
               <IconPlaystation svg-class="brands-icons" svg-color="#ffffff" />
            </div>
            <div class="swiper-slide">
               <IconLinuxMint svg-class="brands-icons" svg-color="#ffffff" />
            </div>
            <div class="swiper-slide">
               <IconGog svg-class="brands-icons" svg-color="#ffffff" />
            </div>
            <div class="swiper-slide">
               <IconEpicGames svg-class="brands-icons" svg-color="#ffffff" />
            </div>
            <div class="swiper-slide">
               <IconAndroid svg-class="brands-icons" svg-color="#ffffff" />
            </div>
            <div class="swiper-slide">
               <IconSteam svg-class="brands-icons" svg-color="#ffffff" />
            </div>
         </div>
      </div>
      <div class="illustrations mt-[5rem]">
         <IlluAllPlatforms1 svg-width="800" />
      </div>
   </div>
</template>

<style scoped>
.lp3-container {
   height: 100vh;
   margin-top: 5rem;
   > .illustrations {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
   }
   > .title {
      text-align: center;
      > .title-highlight-section {
         color: var(--primary-color);
      }
   }
   > .brands-swiper {
      width: 80%;
      pointer-events: none;
      overflow: hidden;
      & .brands-icons {
         width: 50px;
         height: 50px;
      }
      > .swiper-wrapper {
         transition-timing-function: linear;
         > .swiper-slide {
            width: auto;
         }
      }
   }
}
</style>
