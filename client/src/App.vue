<script setup>
// vue
import { onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

// frameworks/libs
import { useUserStore } from '@/stores/userStore.js';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// components
import MainNavbar from '@/components/main/MainNavbar.vue';
import MainFooter from '@/components/main/MainFooter.vue';

// Init service and store
const userStore = useUserStore();
const route = useRoute();

//***===== State =====***//

// Take propreties of executed route
const routeInfo = computed(() => ({
   name: route.name,
   path: route.path,
   meta: route.meta,
}));

//***===== Lifecycle =====***//

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

onMounted(async () => {
   // Verify user token and get user infos
   const r = await userStore.checkLoginStatus();
   if (r === true) {
      toast('Login successful', {
         theme: 'colored',
         type: 'success',
         autoClose: 3000, // Close after 3 seconds
      });
   } else if (r === false) {
      toast('Session expired', {
         theme: 'colored',
         type: 'warning',
         autoClose: 3000, // Close after 3 seconds
      });
   }
   await userStore.getUserData();
});
</script>

<template>
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
