<script setup>
// **** IMPORTS ****
import { onMounted, ref } from 'vue';

// *** Import PrimeVue Components ***
import Card from 'primevue/card';

// *** Import Icons ***
import IconChat from '../icons/IconChat.vue';
import IconSettingsWheel from '../icons/IconSettingsWheel.vue';
import IconMedal from '../icons/IconMedal.vue';

// *** Import Framework ***
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// *** Import Functions ***
import { animateElementOnScroll } from 'Modules/utils.js';

// **** LOGIC ****

// *** Select dom element using refs ***
const cardLeft = ref(null);
const cardMiddle = ref(null);
const cardRight = ref(null);
const mainTitle = ref(null);

onMounted(() => {
   // *** Trigger css animations from animate.css on scroll ***
   // Animate title
   animateElementOnScroll(mainTitle, 'animate__bounceInLeft', 2, 0);

   // Animate cards
   animateElementOnScroll(cardLeft, 'animate__zoomInLeft', 2, 0.5);
   animateElementOnScroll(cardMiddle, 'animate__zoomInDown', 2, 0.5);
   animateElementOnScroll(cardRight, 'animate__zoomInRight', 2, 0.5);
});
</script>

<template>
   <div class="h-[70Vh] bg-bg3 flex flex-col justify-center pt-20">
      <div class="" ref="mainTitle">
         <h1 class="text-5xl/[1.6] text-center font-bold">
            Experiment with an impressive set <br />
            of
            <span class="hover-effect-text-underline-marker relative inline-block"
               >Original Features</span
            >
         </h1>
      </div>
      <div
         class="lp6-container w-full h-[50vh] flex flex-row justify-center items-center gap-[6rem]"
      >
         <Card
            class="w-[21rem] h-[14.5rem] overflow-hidden bg-[#5078a4] flex flex-col justify-center items-center invisible"
            ref="cardLeft"
         >
            <template #header>
               <div
                  class="w-[60px] h-[60px] rounded-full border-2 border-white flex justify-center items-center mt-5"
               >
                  <IconChat svg-width="39" svg-color="#ffffff" />
               </div>
            </template>
            <template #title
               ><h1 class="text-2xl font-bold text-white text-center">Social</h1></template
            >
            <template #content>
               <p class="m-0 text-white text-center pr-5 pl-5 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
               </p>
            </template>
         </Card>
         <Card
            class="w-[21rem] h-[14.5rem] overflow-hidden bg-[#a45078] flex flex-col justify-center items-center invisible"
            ref="cardMiddle"
         >
            <template #header>
               <div
                  class="w-[60px] h-[60px] rounded-full border-2 border-white flex justify-center items-center mt-5"
               >
                  <IconMedal svg-width="39" svg-color="#ffffff" />
               </div>
            </template>
            <template #title
               ><h1 class="text-2xl font-bold text-white text-center">Ranking</h1></template
            >
            <template #content>
               <p class="m-0 text-white text-center pr-5 pl-5 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
               </p>
            </template>
         </Card>
         <Card
            class="w-[21rem] h-[14.5rem] overflow-hidden bg-[#7c50a4] flex flex-col justify-center items-center invisible"
            ref="cardRight"
         >
            <template #header>
               <div
                  class="w-[60px] h-[60px] rounded-full border-2 border-white flex justify-center items-center mt-5"
               >
                  <IconSettingsWheel svg-width="39" svg-color="#ffffff" />
               </div>
            </template>
            <template #title
               ><h1 class="text-2xl font-bold text-white text-center">Customization</h1></template
            >
            <template #content>
               <p class="m-0 text-white text-center pr-5 pl-5 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
               </p>
            </template>
         </Card>
      </div>
   </div>
</template>

<style scoped></style>
