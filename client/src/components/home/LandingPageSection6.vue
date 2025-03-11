<script setup>
// **** IMPORTS ****
import { onMounted, ref } from 'vue';

// *** Import PrimeVue Components ***
import Button from 'primevue/button';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';

// *** Import Icons ***
import IconChevronRight from '@/components/icons/IconChevronRight.vue';
import IconCircleUserProfile from '@/components/icons/IconCircleUserProfile.vue';

// *** Import Frameworks ***
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// *** Import Functions ***
import { animateElementOnScroll } from '@/utils/general';

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
         <h1 class="invisible mb-10 ml-[4.5rem] text-4xl font-bold" ref="titleSection1">
            Trending Games <IconChevronRight svg-color="#ffffff" svg-width="35px" />
         </h1>
         <div
            class="background-img-container invisible grid h-[432px] grid-cols-2 place-content-center"
            ref="mainSection1"
         >
            <div
               class="col-span-1 flex flex-col items-start justify-start gap-3 pb-[5rem] pl-[3rem]"
            >
               <img
                  class="drop-shadow-3xl h-[140px] w-[250px]"
                  src="@/assets/img/ernightreign-title.png"
               />
               <h3
                  class="custom-hover-effect-text-underline-marker relative ml-[22px] inline-block text-center text-4xl font-bold"
               >
                  Elden-Ring: Night Reign
               </h3>
               <p class="ml-[22px] pr-[6rem]">
                  In esse sunt sit magna labore.Dolor aliqua consequat dolor esse. Ad dolor
                  reprehenderit cillum nulla.
               </p>
               <Button
                  class="text-custom-red hover:bg-btn-active mt-3 ml-[22px] h-[55px] w-[240px] border-white bg-white font-semibold active:bg-white"
                  label="See in library"
                  raised
               />
            </div>
            <div class="col-span-1 flex flex-col items-end gap-3 pr-[3rem] pb-[5rem]">
               <img
                  class="drop-shadow-3xl h-[140px] w-[250px]"
                  src="@/assets/img/mhwild-title.png"
               />
               <h3
                  class="custom2-hover-effect-text-underline-marker relative mr-[22px] inline-block text-center text-4xl font-bold"
               >
                  Monster Hunter Wild
               </h3>
               <p class="mr-[22px] pl-[6rem] text-end">
                  In esse sunt sit magna labore.Dolor aliqua consequat dolor esse. Ad dolor
                  reprehenderit cillum nulla.
               </p>
               <Button
                  class="hover:text-custom-lightblue active:bg-btn-active mt-3 mr-[22px] h-[55px] w-[240px] border-2 border-white font-semibold text-white hover:bg-white"
                  label="See in library"
                  variant="outlined"
                  raised
               />
            </div>
         </div>
      </div>
      <div class="mt-[4rem]">
         <h1 class="invisible mb-10 ml-[4.5rem] text-4xl font-bold" ref="titleSection2">
            Best players <IconChevronRight svg-color="#ffffff" svg-width="35px" />
         </h1>
         <div
            class="invisible grid grid-cols-3 place-content-center place-items-center pt-[6rem]"
            ref="mainSection2"
         >
            <div class="col-span-1">
               <div class="flex items-center justify-center">
                  <Avatar
                     icon="pi pi-user"
                     class="absolute mr-0.5 ml-0.5 h-[8rem] w-[8rem] shadow-2xl"
                     size="xlarge"
                     shape="circle"
                  >
                     <IconCircleUserProfile svg-color="var(--color-secondary)" svg-width="4rem" />
                  </Avatar>
               </div>
               <Card
                  class="flex h-[22rem] w-[19rem] flex-col justify-center border-4 border-[#ff0068] pt-15 shadow-2xl"
               >
                  <template #header>
                     <h3 class="text-center text-3xl font-bold text-[#ff0068]">Username</h3>
                  </template>
                  <template #content>
                     <div class="flex flex-col items-center gap-4">
                        <img
                           class="drop-shadow-3xl h-[8rem] w-[8rem]"
                           src="@/assets/img/ranks/icon-rank1.webp"
                        />
                        <p class="text-center text-sm italic opacity-50">
                           Valorent, Overwatch, League of Legend, Starcraft 2...
                        </p>
                     </div>
                  </template>
               </Card>
            </div>
            <div class="span-cols-1 col-span-1">
               <div class="flex items-center justify-center">
                  <Avatar
                     icon="pi pi-user"
                     class="absolute mr-0.5 ml-0.5 h-[8rem] w-[8rem] shadow-2xl"
                     size="xlarge"
                     shape="circle"
                  >
                     <IconCircleUserProfile svg-color="var(--color-secondary)" svg-width="4rem" />
                  </Avatar>
               </div>
               <Card
                  class="flex h-[22rem] w-[19rem] flex-col justify-center border-4 border-[#ffa65c] pt-15 shadow-2xl"
               >
                  <template #header>
                     <h3 class="text-center text-3xl font-bold text-[#ffa65c]">Username</h3>
                  </template>
                  <template #content>
                     <div class="flex flex-col items-center gap-4">
                        <img
                           class="drop-shadow-3xl h-[8rem] w-[8rem]"
                           src="@/assets/img/ranks/icon-rank2.webp"
                        />
                        <p class="text-center text-sm italic opacity-50">
                           Valorent, Overwatch, League of Legend, Starcraft 2...
                        </p>
                     </div>
                  </template>
               </Card>
            </div>
            <div class="span-cols-1 col-span-1">
               <div class="flex items-center justify-center">
                  <Avatar
                     icon="pi pi-user"
                     class="absolute mr-0.5 ml-0.5 h-[8rem] w-[8rem] shadow-2xl"
                     size="xlarge"
                     shape="circle"
                  >
                     <IconCircleUserProfile svg-color="var(--color-secondary)" svg-width="4rem" />
                  </Avatar>
               </div>
               <Card
                  class="flex h-[22rem] w-[19rem] flex-col justify-center border-4 border-[#9966ff] pt-15 shadow-2xl"
               >
                  <template #header>
                     <h3 class="text-center text-3xl font-bold text-[#9966ff]">Username</h3>
                  </template>
                  <template #content>
                     <div class="flex flex-col items-center gap-4">
                        <img
                           class="drop-shadow-3xl h-[8rem] w-[8rem]"
                           src="@/assets/img/ranks/icon-rank3.webp"
                        />
                        <p class="text-center text-sm italic opacity-50">
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
