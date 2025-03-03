<script setup>
// **** IMPORTS ****
import { onMounted, ref } from 'vue';

// *** Import PrimeVue Components ***
import Button from 'primevue/button';

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

// *** Import Frameworks ***
import Swiper from 'swiper/bundle';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// *** Import Functions ***
import { animateElementOnScroll } from 'Modules/utils.js';

// **** LOGIC ****

// *** Select dom element using refs ***
const titleSection = ref(null);
const illuSection = ref(null);
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
                  const swiper = new Swiper('.brands-swiper', {
                     loop: true,
                     slidesPerView: '10',
                     spaceBetween: 110,
                     disableOnInteraction: false,
                     autoplay: {
                        delay: 0,
                     },
                     speed: 5000,
                  });
               });
            },
         },
      });
   }

   // *** Trigger css animations from animate.css on scroll ***
   animateElementOnScroll(titleSection, 'animate__bounceInLeft', 1, 0);
   animateElementOnScroll(illuSection, 'animate__zoomInRight', 1, 0.5);
   animateSliderOnScroll(sliderSection, 'animate__fadeInUp', 1, 1.4);
});
</script>

<template>
   <div class="lp3-container flex flex-col items-center justify-center gap-[5rem]">
      <div class="flex flex-row justify-center items-center gap-[2rem]">
         <div class="invisible" ref="titleSection">
            <h1 class="title text-5xl/[1.6] font-bold">
               <span class="">Features</span>
               and
               <span class="hover-effect-text-underline-marker relative inline-block">Games</span>
               <br />
               available on
               <span class="text-primary"
                  ><br />
                  All Platforms !
               </span>
            </h1>
            <p class="mt-[2rem]">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed <br />do eiusmod tempor
               incididunt.
            </p>
            <Button
               class="w-[240px] h-[55px] text-secondary font-semibold hover:text-secondary mt-[1.5rem]"
               label="Sign-up"
               raised
            />
         </div>
         <div class="illustrations invisible" ref="illuSection">
            <IlluAllPlatforms1 svg-width="650" />
         </div>
      </div>
      <div class="brands-swiper mt-10 invisible" ref="sliderSection">
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
   </div>
</template>

<style scoped>
.lp3-container {
   height: 94vh;
   > .illustrations {
      display: flex;
      justify-content: center;
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
