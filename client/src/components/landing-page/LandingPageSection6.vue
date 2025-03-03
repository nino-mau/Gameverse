<script setup>
// **** IMPORTS ****
import { onMounted, ref } from 'vue';

// *** Import PrimeVue Components ***
import Button from 'primevue/button';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';

// *** Import Icons ***
import IconChevronRight from '../icons/IconChevronRight.vue';
import IconCircleUserProfile from '../icons/IconCircleUserProfile.vue';

// *** Import Frameworks ***
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// *** Import Functions ***
import { animateElementOnScroll } from 'Modules/utils.js';

// **** LOGIC ****

// *** Select dom element using refs ***
const titleSection1 = ref(null);
const mainSection1 = ref(null);
const titleSection2 = ref(null);
const mainSection2 = ref(null);

onMounted(() => {
   // *** Trigger css animations from animate.css on scroll ***
   animateElementOnScroll(titleSection1, 'animate__bounceInLeft', 2, 0);
   animateElementOnScroll(mainSection1, 'animate__fadeIn', 2, 1);
   animateElementOnScroll(titleSection2, 'animate__bounceInLeft', 2, 1.2);
   animateElementOnScroll(mainSection2, 'animate__fadeIn', 2, 2);
});
</script>

<template>
   <div class="h-[94Vh]">
      <div>
         <h1 class="text-4xl font-bold ml-[4.5rem] mb-10 invisible" ref="titleSection1">
            Trending Games <IconChevronRight svg-color="#ffffff" svg-width="35px" />
         </h1>
         <div
            class="background-img-container grid grid-cols-2 place-content-center h-[432px] invisible"
            ref="mainSection1"
         >
            <div
               class="col-span-1 flex flex-col gap-3 justify-start items-start pl-[3rem] pb-[5rem]"
            >
               <img
                  class="w-[250px] h-[140px] drop-shadow-3xl"
                  src="@/assets/img/ernightreign-title.png"
               />
               <h3
                  class="ml-[22px] text-4xl font-bold text-center custom-hover-effect-text-underline-marker relative inline-block"
               >
                  Elden-Ring: Night Reign
               </h3>
               <p class="ml-[22px] pr-[6rem]">
                  In esse sunt sit magna labore.Dolor aliqua consequat dolor esse. Ad dolor
                  reprehenderit cillum nulla.
               </p>
               <Button
                  class="w-[240px] h-[55px] ml-[22px] text-custom-red bg-white border-white font-semibold active:bg-white hover:bg-btn-active mt-3"
                  label="See in library"
                  raised
               />
            </div>
            <div class="col-span-1 flex flex-col gap-3 items-end pr-[3rem] pb-[5rem]">
               <img
                  class="w-[250px] h-[140px] drop-shadow-3xl"
                  src="@/assets/img/mhwild-title.png"
               />
               <h3
                  class="mr-[22px] text-4xl font-bold text-center custom2-hover-effect-text-underline-marker relative inline-block"
               >
                  Monster Hunter Wild
               </h3>
               <p class="mr-[22px] pl-[6rem] text-end">
                  In esse sunt sit magna labore.Dolor aliqua consequat dolor esse. Ad dolor
                  reprehenderit cillum nulla.
               </p>
               <Button
                  class="w-[240px] h-[55px] mr-[22px] border-2 text-white border-white font-semibold hover:text-custom-lightblue hover:bg-white active:bg-btn-active mt-3"
                  label="See in library"
                  variant="outlined"
                  raised
               />
            </div>
         </div>
      </div>
      <div class="mt-[4rem]">
         <h1 class="text-4xl font-bold ml-[4.5rem] mb-10 invisible" ref="titleSection2">
            Best players <IconChevronRight svg-color="#ffffff" svg-width="35px" />
         </h1>
         <div
            class="grid grid-cols-3 place-content-center place-items-center pt-[6rem] invisible"
            ref="mainSection2"
         >
            <div class="col-span-1">
               <div class="flex justify-center items-center">
                  <Avatar
                     icon="pi pi-user"
                     class="w-[8rem] h-[8rem] shadow-2xl mr-0.5 ml-0.5 absolute"
                     size="xlarge"
                     shape="circle"
                  >
                     <IconCircleUserProfile svg-color="var(--color-secondary)" svg-width="4rem" />
                  </Avatar>
               </div>
               <Card
                  class="w-[19rem] h-[22rem] flex flex-col justify-center pt-15 border-4 border-[#ff0068] shadow-2xl"
               >
                  <template #header>
                     <h3 class="text-3xl font-bold text-center text-[#ff0068]">Username</h3>
                  </template>
                  <template #content>
                     <div class="flex flex-col items-center gap-4">
                        <img
                           class="w-[8rem] h-[8rem] drop-shadow-3xl"
                           src="@/assets/img/ranks/icon-rank1.webp"
                        />
                        <p class="text-sm text-center italic opacity-50">
                           Valorent, Overwatch, League of Legend, Starcraft 2...
                        </p>
                     </div>
                  </template>
               </Card>
            </div>
            <div class="span-cols-1 col-span-1">
               <div class="flex justify-center items-center">
                  <Avatar
                     icon="pi pi-user"
                     class="w-[8rem] h-[8rem] shadow-2xl mr-0.5 ml-0.5 absolute"
                     size="xlarge"
                     shape="circle"
                  >
                     <IconCircleUserProfile svg-color="var(--color-secondary)" svg-width="4rem" />
                  </Avatar>
               </div>
               <Card
                  class="w-[19rem] h-[22rem] flex flex-col justify-center pt-15 border-4 border-[#ffa65c] shadow-2xl"
               >
                  <template #header>
                     <h3 class="text-3xl font-bold text-center text-[#ffa65c]">Username</h3>
                  </template>
                  <template #content>
                     <div class="flex flex-col items-center gap-4">
                        <img
                           class="w-[8rem] h-[8rem] drop-shadow-3xl"
                           src="@/assets/img/ranks/icon-rank2.webp"
                        />
                        <p class="text-sm text-center italic opacity-50">
                           Valorent, Overwatch, League of Legend, Starcraft 2...
                        </p>
                     </div>
                  </template>
               </Card>
            </div>
            <div class="span-cols-1 col-span-1">
               <div class="flex justify-center items-center">
                  <Avatar
                     icon="pi pi-user"
                     class="w-[8rem] h-[8rem] shadow-2xl mr-0.5 ml-0.5 absolute"
                     size="xlarge"
                     shape="circle"
                  >
                     <IconCircleUserProfile svg-color="var(--color-secondary)" svg-width="4rem" />
                  </Avatar>
               </div>
               <Card
                  class="w-[19rem] h-[22rem] flex flex-col justify-center pt-15 border-4 border-[#9966ff] shadow-2xl"
               >
                  <template #header>
                     <h3 class="text-3xl font-bold text-center text-[#9966ff]">Username</h3>
                  </template>
                  <template #content>
                     <div class="flex flex-col items-center gap-4">
                        <img
                           class="w-[8rem] h-[8rem] drop-shadow-3xl"
                           src="@/assets/img/ranks/icon-rank3.webp"
                        />
                        <p class="text-sm text-center italic opacity-50">
                           Valorent, Overwatch, League of Legend, Starcraft 2...
                        </p>
                     </div>
                  </template>
               </Card>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.background-img-container {
   background-image: url(@/assets/img/bg-img-split2.png);
   background-size: cover;
   background-position-x: -30px;
}

/* --- Custom hover effect --- */

/* - 1 - */
.custom-hover-effect-text-underline-marker {
   background-image: linear-gradient(
      120deg,
      var(--color-custom-lightblue) 0%,
      var(--color-custom-lightblue) 100%
   );
   background-repeat: no-repeat;
   background-size: 100% 0.4em;
   background-position: 0 88%;
   transition: background-size 0.25s ease-in;
}
.custom-hover-effect-text-underline-marker:hover {
   background-size: 100% 90%;
}

/* - 2 - */
.custom2-hover-effect-text-underline-marker {
   background-image: linear-gradient(
      120deg,
      var(--color-custom-red) 0%,
      var(--color-custom-red) 100%
   );
   background-repeat: no-repeat;
   background-size: 100% 0.4em;
   background-position: 0 88%;
   transition: background-size 0.25s ease-in;
}
.custom2-hover-effect-text-underline-marker:hover {
   background-size: 100% 90%;
}
</style>
