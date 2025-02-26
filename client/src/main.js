import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

// *** Import primevue components ***

import Button from 'primevue/button';

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

const app = createApp(App);
app.component('PrButton', Button);

app.use(router);
app.use(PrimeVue, {
   theme: {
      preset: MyPreset,
      options: {
         darkModeSelector: false,
      },
   },
});

app.mount('#app');
