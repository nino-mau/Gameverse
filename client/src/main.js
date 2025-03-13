/*==============================
===========  IMPORTS  ==========
===============================*/

// js files
import './assets/main.css';

// components
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// swiper js style
import 'swiper/css/bundle';

// swiper js
import { register } from 'swiper/element/bundle';

// primeVue
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import ToastService from 'primevue/toastservice';

// pinia
import { createPinia } from 'pinia';

// gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Aaimate.css
import 'animate.css';

/*==============================
============  MAIN  ============
===============================*/

gsap.registerPlugin(ScrollTrigger); // init gsap

register(); // init swiper js web elements

const MyPreset = definePreset(Aura, {
   semantic: {
      primary: {
         // Change primary and secondary colors variable provided by primevue
         50: '{pink.50}',
         100: '{pink.100}',
         200: '{pink.200}',
         300: '{pink.300}',
         400: '{pink.300}',
         500: '#FF92CB',
         600: '{pink.300}',
         700: '{pink.400}',
      },
      secondary: {
         50: '{indigo.300}',
         100: '{indigo.400}',
         200: '{indigo.500}',
         300: '{indigo.600}',
         400: '##5250A4',
         500: '#5250A4',
      },
   },
});

//***===== Setup App =====***//

const pinia = createPinia();

const app = createApp(App);

// Set global variables
app.config.globalProperties.$shortTermTokenKey = 'userToken';

// Set plugins
app.use(router);
app.use(PrimeVue, {
   theme: {
      preset: MyPreset,
      options: {
         darkModeSelector: false,
      },
   },
});
app.use(ToastService);
app.use(pinia);

app.mount('#app');
