// js files
import './assets/main.css';

// components
import { createApp, h } from 'vue';
import App from './App.vue';
import router from './router';

// icons
import IconToastError from './components/icons/IconToastError.vue';
import IconToastWarn from './components/icons/IconToastWarn.vue';
import IconToastInfo from './components/icons/IconToastInfo.vue';
import IconToastSuccess from './components/icons/IconToastSuccess.vue';

// toastify
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// swiper js style
import 'swiper/css/bundle';

// swiper js
import { register } from 'swiper/element/bundle';

// primeVue
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import ToastService from 'primevue/toastservice';
import Ripple from 'primevue/ripple';

// pinia
import { createPinia } from 'pinia';

// gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Animate.css
import 'animate.css';

//***===== Setup =====***//

gsap.registerPlugin(ScrollTrigger); // init gsap

register(); // init swiper js web elements

// primevue theme preset
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

// Pass custom icon to toastify toasts
const ResolveCustomIcon = (props) => {
   const isColoredTheme = props.theme === 'colored';

   switch (props.type) {
      case 'info':
         return isColoredTheme ? IconToastInfo : h(IconToastInfo, { color: '#3498DB' });
      case 'success':
         return isColoredTheme ? IconToastSuccess : h(IconToastSuccess, { color: '#44bb2e' });
      case 'error':
         return isColoredTheme ? IconToastError : h(IconToastError, { color: '#da5a42' });
      case 'warning':
         return isColoredTheme ? IconToastWarn : h(IconToastWarn, { color: '#eac839' });
      default:
         return undefined;
   }
};

const pinia = createPinia();

const app = createApp(App);

// Set plugins
app.directive('ripple', Ripple);
app.use(pinia);
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
   ripple: true,
   theme: {
      preset: MyPreset,
      options: {
         darkModeSelector: false,
      },
   },
});
app.use(Vue3Toasity, {
   icon: ResolveCustomIcon,
});

app.mount('#app');
