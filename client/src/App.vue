<script setup>
// *** Import page sections components ***
import MainNavbar from './components/MainNavbar.vue';
import MainFooter from './components/MainFooter.vue';
</script>

<template>
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
