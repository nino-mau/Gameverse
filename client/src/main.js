import './assets/main.css';

// *** Import Components ***
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// *** Import Frameworks/Librairies ***

// Swiper JS Styles
import 'swiper/css/bundle';

// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import ToastService from 'primevue/toastservice';

// Pinia
import { createPinia } from 'pinia';

// Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// Animate.css
import 'animate.css';

// *** Custom style for primevue ***

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

// *** Setup App ***

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
