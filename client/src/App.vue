<script setup>
import MainNavbar from './components/MainNavbar.vue';
</script>

<template>
  <header class="site-header">
    <MainNavbar />
  </header>
</template>

<style scoped>

.site-header {
  overflow:auto;
  position: sticky; /* Make header and it's navbar follow the page while scrolled */
  top: 0;
  z-index: 1000;

}

</style>
