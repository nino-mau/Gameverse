<script setup>
// **** IMPORTS ****
import { onMounted, ref } from 'vue';

// *** Import PrimeVue Components ***
import Button from 'primevue/button';

// *** Import Custom Components ***
import BtnCustomHover1 from '@/components/ui/BtnCustomHover1.vue';

// *** Import Icons ***
import IconGameController from '@/components/icons/IconGameController.vue';

// *** Import Frameworks ***
import Swiper from 'swiper/bundle';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// *** Import Functions ***
import { animateElementOnScroll } from '@/utils/general';

// **** LOGIC ****

// *** Select dom element using refs ***
const titleSection = ref(null);
const sliderSection = ref(null);

onMounted(() => {
   // Custom instructions is needed to make sure swiper is initialized after it become visible
   function animateSliderOnScroll(element, animation, duration, delay) {
      const domSilderSection = element.value;
      gsap.to(domSilderSection, {
         scrollTrigger: {
            trigger: domSilderSection,
            once: true,
            start: 'top 100%',
            onEnter: () => {
               gsap.delayedCall(delay, () => {
                  domSilderSection.classList.add(
                     'animate__animated',
                     animation,
                     'animate_duration-' + duration + 's',
                  );
                  domSilderSection.classList.remove('invisible');

                  // Init swiper element
                  // eslint-disable-next-line no-unused-vars
                  const swiper = new Swiper('.lp4-games-swiper', {
                     loop: true,
                     slidesPerView: '5',
                     spaceBetween: '1',
                     autoplay: {
                        delay: 0,
                     },
                     speed: 10000,
                  });
               });
            },
         },
      });
   }

   // *** Trigger css animations from animate.css on scroll ***
   animateElementOnScroll(titleSection, 'animate__bounceInRight', 2, 0);
   animateSliderOnScroll(sliderSection, 'animate__fadeInUp', 2, 1);
});
</script>

<template>
   <div class="lp4-container bg-bg4 flex h-[94vh] w-full flex-col">
      <div
         class="invisible flex flex-col items-center justify-center gap-5 pr-[25rem] pl-[25rem]"
         ref="titleSection"
      >
         <h1 class="mt-[3rem] text-center text-5xl/[1.6] font-bold">
            <span class="text-primary">Hundreds of games</span> ready to be
            <span class="hover-effect-text-underline-marker relative inline-block">discovered</span>
            !
         </h1>
         <p class="text-center text-base">
            Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis
            sit aliquam sit nullam neques.
         </p>
         <div>
            <BtnCustomHover1
               btn-class="lp3-custom-btn1 lp3-custom-btn1:hover"
               btn-label="Browse"
               :btn-icon="IconGameController"
               btn-icon-width="40"
               btn-icon-color="var(--color-bg4)"
            />
            <Button
               class="bg-bg4 hover:text-bg4 active:bg-btn-active ml-7 h-[55px] w-[240px] border-white text-white hover:bg-white"
               label="Learn more"
               raised
            />
         </div>
      </div>
      <div class="flex flex-1 items-center justify-center">
         <div
            class="lp4-games-swiper pointer-events-none invisible overflow-hidden"
            ref="sliderSection"
         >
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

.lp3-custom-btn1 {
   background-color: white;
   color: var(--color-bg4);
   border-color: white;
   height: 55px;
   width: 240px;
   margin-right: 5;
   font-weight: 600; /* Semi-bold */
}
.lp3-custom-btn1:active {
   background-color: var(--color-btn-active);
}
.lp3-custom-btn1:hover {
   background-color: white !important;
   border-color: white !important;
}
</style>
