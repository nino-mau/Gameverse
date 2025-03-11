<script setup>
// **** IMPORTS ****
import { onMounted, ref } from 'vue';

// *** Import PrimeVue Components ***
import Button from 'primevue/button';

// *** Import Frameworks ***
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// *** Import Functions ***
import { animateElementOnScroll } from '@/utils/general';

// **** LOGIC ****

// *** Select dom element using refs ***
const titleSection = ref(null);
const imgSection = ref(null);

onMounted(() => {
   // *** Trigger css animations from animate.css on scroll ***
   animateElementOnScroll(titleSection, 'animate__bounceInRight', 1, 0.5);
   animateElementOnScroll(imgSection, 'animate__fadeInLeft', 1, 0.1);
});
</script>

<template>
   <div class="flex h-[75vh] flex-col justify-end">
      <div class="flex h-[538px] flex-col justify-end">
         <div class="bg-bg4 grid h-[412px] grid-cols-2 place-items-center">
            <div class="span-cols-1 invisible" ref="imgSection">
               <img class="mt-[-8.2rem]" src="@/assets/img/game-character-illustration3.webp" />
            </div>
            <div
               class="text-section span-cols-1 invisible ml-25 flex flex-col justify-center"
               ref="titleSection"
            >
               <h3 class="pr-15 text-3xl/[1.6] font-bold text-white">
                  See our
                  <span
                     class="custom-hover-effect-text-underline-marker relative inline-block text-white"
                     >Frequently Asked Questions</span
                  >
                  for any aditional Informations !
               </h3>
               <p class="pt-5 pr-15">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore
               </p>
               <Button
                  class="hover:text-bg4 active:bg-btn-active active:border-btn-active mt-3 h-[55px] w-[240px] border-2 border-white font-semibold text-white hover:bg-white"
                  label="FAQ"
                  variant="outlined"
                  raised
               />
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
/* --- Custom hover effect --- */

/* - 1 - */
.custom-hover-effect-text-underline-marker {
   background-image: linear-gradient(
      120deg,
      var(--color-secondary) 0%,
      var(--color-secondary) 100%
   );
   background-repeat: no-repeat;
   background-size: 100% 0.4em;
   background-position: 0 88%;
   transition: background-size 0.25s ease-in;
}
.custom-hover-effect-text-underline-marker:hover {
   background-size: 100% 90%;
}
</style>
