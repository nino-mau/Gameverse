<script setup>
// **** IMPORTS ****
import { onMounted, ref } from 'vue';

// *** Import PrimeVue Components ***
import Card from 'primevue/card';

// *** Import Icons ***
import IconChat from '@/components/icons/IconChat.vue';
import IconSettingsWheel from '@/components/icons/IconSettingsWheel.vue';
import IconMedal from '@/components/icons/IconMedal.vue';

// *** Import Framework ***
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// *** Import Functions ***
import { animateElementOnScroll } from '@/utils/general';

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
   <div class="bg-bg3 flex h-[70Vh] flex-col justify-center pt-20">
      <div class="" ref="mainTitle">
         <h1 class="text-center text-5xl/[1.6] font-bold">
            Experiment with an impressive set <br />
            of
            <span class="hover-effect-text-underline-marker relative inline-block"
               >Original Features</span
            >
         </h1>
      </div>
      <div
         class="lp6-container flex h-[50vh] w-full flex-row items-center justify-center gap-[6rem]"
      >
         <Card
            class="invisible flex h-[14.5rem] w-[21rem] flex-col items-center justify-center overflow-hidden bg-[#5078a4]"
            ref="cardLeft"
         >
            <template #header>
               <div
                  class="mt-5 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-white"
               >
                  <IconChat svg-width="39" svg-color="#ffffff" />
               </div>
            </template>
            <template #title
               ><h1 class="text-center text-2xl font-bold text-white">Social</h1></template
            >
            <template #content>
               <p class="m-0 mt-2 pr-5 pl-5 text-center text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
               </p>
            </template>
         </Card>
         <Card
            class="invisible flex h-[14.5rem] w-[21rem] flex-col items-center justify-center overflow-hidden bg-[#a45078]"
            ref="cardMiddle"
         >
            <template #header>
               <div
                  class="mt-5 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-white"
               >
                  <IconMedal svg-width="39" svg-color="#ffffff" />
               </div>
            </template>
            <template #title
               ><h1 class="text-center text-2xl font-bold text-white">Ranking</h1></template
            >
            <template #content>
               <p class="m-0 mt-2 pr-5 pl-5 text-center text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
               </p>
            </template>
         </Card>
         <Card
            class="invisible flex h-[14.5rem] w-[21rem] flex-col items-center justify-center overflow-hidden bg-[#7c50a4]"
            ref="cardRight"
         >
            <template #header>
               <div
                  class="mt-5 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-white"
               >
                  <IconSettingsWheel svg-width="39" svg-color="#ffffff" />
               </div>
            </template>
            <template #title
               ><h1 class="text-center text-2xl font-bold text-white">Customization</h1></template
            >
            <template #content>
               <p class="m-0 mt-2 pr-5 pl-5 text-center text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
               </p>
            </template>
         </Card>
      </div>
   </div>
</template>

<style scoped></style>
