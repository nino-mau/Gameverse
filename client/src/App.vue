<script setup>
// *** Import page sections components ***
import MainNavbar from './components/MainNavbar.vue';
import LandingPageSection1 from './components/LandingPageSection1.vue';
import LandingPageSection2 from './components/LandingPageSection2.vue';
import LandingPageSection3 from './components/LandingPageSection3.vue';
</script>

<template>
   <header class="site-header">
      <MainNavbar />
   </header>
   <main class="landing-page-main">
      <LandingPageSection1 />
      <LandingPageSection2 />
      <LandingPageSection3 />
   </main>
</template>

<style scoped>
.site-header {
   overflow: auto;
   position: sticky; /* Make header and it's navbar follow the page while scrolled */
   top: 0;
   z-index: 1000;
}

/* --- Represent the main content of the landing page --- */
.landing-page-main {
   width: 100%;
}
</style>
