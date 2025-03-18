<script setup>
// vue
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// icons
import { Menu } from 'lucide-vue-next';

// components
import DashboardSidebar from '@/components/main/DashboardSidebar.vue';

/*==============================
============  MAIN  ============
===============================*/

// init services
const route = useRoute();

//***===== State =====***//

// Store and update name of loaded page component
let pageName = ref(route.name);

watch(
   () => route.name,
   () => {
      pageName.value = route.name;
   },
   { immediate: true },
);
</script>

<template>
   <div class="flex h-[100vh] w-[100%] flex-row">
      <nav class="h-full w-[18%]">
         <!-- Slide Menu -->
         <DashboardSidebar />
      </nav>
      <!-- Page Container -->
      <div class="flex h-[100%] w-[84%] flex-col items-center overflow-hidden p-[1rem]">
         <!-- Page Title -->
         <div class="mb-[27px] flex h-[10%] w-full flex-col justify-end gap-[27px]">
            <div class="flex flex-row items-center gap-3 opacity-85">
               <Menu size="34" />
               <p class="text-xl">Dashboard</p>
               <p class="text-xl">/</p>
               <p class="text-xl">{{ pageName }}</p>
            </div>
            <h1 class="text-5xl font-bold">{{ pageName }}</h1>
         </div>
         <!-- Page Component -->
         <div class="h-full w-full">
            <RouterView />
         </div>
      </div>
   </div>
</template>

<style scoped></style>
