<script setup>
// **** IMPORTS ****
import { onMounted, ref } from 'vue';

// *** Import PrimeVue Components ***
import Button from 'primevue/button';

// *** Import Icons ***
import IconDonateMoney from '../icons/IconDonateMoney.vue';

// *** Import Frameworks ***
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// *** Import Functions ***
import { animateElementOnScroll } from 'Modules/utils.js';

// **** LOGIC ****

// *** Select dom element using refs ***
const cardTop = ref(null);
const cardBottom = ref(null);

onMounted(() => {
   // *** Trigger css animations from animate.css on scroll ***
   animateElementOnScroll(cardTop, 'animate__bounceInLeft', 2, 0.2);
   animateElementOnScroll(cardBottom, 'animate__bounceInRight', 2, 0.5);
});
</script>

<template>
   <div class="flex flex-col justify-center items-center gap-[6rem] h-[94vh]">
      <div class="w-full flex justify-center items-center">
         <div
            class="cta-container-top w-[920px] h-[315px] border-[2.5px] border-white rounded-md grid grid-cols-5 shadow-2xl bg-bg2 invisible"
            ref="cardTop"
         >
            <div class="text-section col-span-3 flex flex-col justify-center pl-[4rem]">
               <h3 class="text-3xl/[1.6] font-bold">
                  <span class="hover-effect-text-underline-marker relative inline-block"
                     >Sign up</span
                  >
                  or
                  <span class="hover-effect-text-underline-marker relative inline-block"
                     >Login</span
                  >
                  to start using our <span class="text-primary">Features !</span>
               </h3>
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore
               </p>
               <Button
                  class="w-[240px] h-[55px] text-secondary font-semibold hover:text-secondary mt-3"
                  label="Sign-up"
                  raised
               />
            </div>
            <div class="img-section flex justify-center items-end col-span-2 pr-[1.5rem]">
               <img class="drop-shadow-2xl" src="@/assets/img/gameCharacterIllustration.webp" />
            </div>
         </div>
      </div>
      <div class="w-full flex justify-center items-center">
         <div
            class="cta-container-bottom w-[920px] h-[315px] border-[2.5px] border-white rounded-md grid grid-cols-5 place-content-center place-items-center shadow-2xl invisible"
            ref="cardBottom"
         >
            <div class="img-section flex justify-center items-end col-span-2">
               <IconDonateMoney svg-width="200px" svg-color="var(--primary-color)" />
            </div>
            <div class="text-section col-span-3 flex flex-col justify-center">
               <h3 class="text-3xl/[1.6] font-bold pr-15">
                  <span class="hover-effect-text-underline-marker relative inline-block"
                     >Donate</span
                  >
                  to support our Project and our
                  <span class="text-primary">Team !</span>
               </h3>
               <p class="pr-15">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore
               </p>
               <Button
                  class="w-[240px] h-[55px] text-secondary font-semibold hover:text-secondary mt-3"
                  label="Donate"
                  raised
               />
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped></style>
