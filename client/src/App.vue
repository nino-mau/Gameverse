<script setup>
// **** IMPORTS ****
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

// Import frameworks/libs
import { useUserAuthStore } from './stores/authStore.js';

// Import PrimeVue Components
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

// Import Components
import MainNavbar from './components/MainNavbar.vue';
import MainFooter from './components/MainFooter.vue';

// **** INIT ****

const userStore = useUserAuthStore();
const route = useRoute();
const toast = useToast();

// **** LOGICS ****

onMounted(async () => {
   // Verify user token and get user infos
   console.log('ON MOUNT');
   const r = await userStore.checkLoginStatus();
   if (r === true) {
      toast.add({
         severity: 'success',
         summary: 'Succesful login',
         detail: 'You succesfuly connected to your account.',
         life: 3000,
      });
   } else if (r === false) {
      toast.add({
         severity: 'warn',
         summary: 'Session expired',
         detail: 'Your were disconnected after your session ended, please reconnect',
         life: 3000,
      });
   }
   await userStore.getUserData();
   console.log('ON MOUNT');
});

// Execute when page change
watch(
   () => route.fullPath,
   async () => {
      await userStore.checkLoginStatus();
      console.log('WATCH');
      await userStore.getUserData();
      console.log('WATCH');
   },
);
</script>

<template>
   <Toast />
   <header class="site-header">
      <MainNavbar />
   </header>
   <main class="page-main">
      <RouterView />
   </main>
   <footer>
      <MainFooter />
   </footer>
</template>

<style scoped>
.site-header {
   overflow: auto;
   position: sticky; /* Make header and it's navbar follow the page while scrolled */
   top: 0;
   z-index: 1000;
}

/* --- Represent the main content of the landing page --- */
.page-main {
   width: 100%;
}
</style>
