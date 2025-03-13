<script setup>
/*==============================
===========  IMPORTS  ==========
===============================*/

// vue
import { onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

// frameworks/libs
import { useUserStore } from '@/stores/userStore.js';

// primeVue
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

// components
import MainNavbar from '@/components/main/MainNavbar.vue';
import MainFooter from '@/components/main/MainFooter.vue';

/*==============================
============  MAIN  ============
===============================*/

const userStore = useUserStore();
const route = useRoute();
const toast = useToast();

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

// Take propreties of executed route
const routeInfo = computed(() => ({
   name: route.name,
   path: route.path,
   meta: route.meta,
}));

// Handle routing
watch(
   routeInfo,
   async (newRoute) => {
      await userStore.checkLoginStatus();
      console.log('Route changed:', newRoute);
      await userStore.getUserData();
   },
   { deep: true },
);
</script>

<template>
   <!-- Placeholder for popup waning -->
   <Toast />
   <!-- Dashboard has it's own custom header -->
   <header v-if="!route.path.includes('/dashboard')" class="site-header">
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
