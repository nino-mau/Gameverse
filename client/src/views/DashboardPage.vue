<script setup>
/*==============================
===========  IMPORTS  ==========
===============================*/

// components
import DashboardSidebar from '@/components/main/DashboardSidebar.vue';
</script>

<template>
   <div class="flex h-[100vh] flex-row">
      <nav class="h-full">
         <!-- **** Slide Menu ***** -->
         <DashboardSidebar />
      </nav>
      <div class="m-auto h-[90%] w-[80%]">
         <!-- <DashboardProfileSettings /> -->
         <RouterView />
      </div>
   </div>
</template>

<style scoped></style>
