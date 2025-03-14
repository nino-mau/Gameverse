<script setup>
/*==============================
===========  IMPORTS  ==========
===============================*/

// components
import DashboardSidebar from '@/components/main/DashboardSidebar.vue';
</script>

<template>
   <div class="flex h-[100vh] w-[100%] flex-row">
      <nav class="h-full">
         <!-- **** Slide Menu ***** -->
         <DashboardSidebar />
      </nav>
      <div class="flex h-[100%] w-[85.9%] flex-col items-center pt-10 pr-10 pb-10 pl-10">
         <!-- <DashboardProfileSettings /> -->
         <RouterView />
      </div>
   </div>
</template>

<style scoped></style>
