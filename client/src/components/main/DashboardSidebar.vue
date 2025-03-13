<script setup>
/*==============================
===========  IMPORTS  ==========
===============================*/

// vue
import { ref, markRaw } from 'vue';
import { useRouter } from 'vue-router';

// libs
import { useUserStore } from '@/stores/userStore.js';

// primevue
import Menu from 'primevue/menu';

// icons
import { Settings, MessageSquare, LogOut, LayoutDashboard, Gamepad2 } from 'lucide-vue-next';
import IconSite from '../icons/IconSite.vue';

// components
import CustomAvatar from '../icons/CustomAvatar.vue';

/*==============================
============  MAIN  ============
===============================*/

const router = useRouter(); // init router

const userStore = useUserStore(); // Setup user auth store

//***===== Side Menu =====***//

const slideMenuitems = ref([
   {
      separator: true,
   },
   {
      label: 'Documents',
      items: [
         {
            label: 'New',
         },
         {
            label: 'Search',
         },
      ],
   },
   {
      label: 'Profile',
      items: [
         {
            label: 'Overview',
            icon: markRaw(LayoutDashboard),
            iconProps: { color: '#334155', size: '20' },
         },
         {
            label: 'Games',
            icon: markRaw(Gamepad2),
            iconProps: { color: '#334155', size: '20' },
            command: () => {
               router.push('/dashboard/profileGames');
            },
         },
         {
            label: 'Settings',
            icon: markRaw(Settings),
            iconProps: { color: '#334155', size: '20' },
            command: () => {
               router.push('/dashboard/profileSettings');
            },
         },
         {
            label: 'Messages',
            icon: markRaw(MessageSquare),
            iconProps: { color: '#334155', size: '20' },
         },
         {
            label: 'Logout',
            icon: markRaw(LogOut),
            iconProps: { color: '#334155', size: '20' },
         },
      ],
   },
]);
</script>

<template>
   <Menu
      :model="slideMenuitems"
      class="bg-bg2 border-bg2 flex h-[100%] w-[18%] flex-col text-white"
   >
      <template #start>
         <div class="flex flex-row items-center justify-center">
            <span class="flex items-center gap-1 px-2 py-2">
               <IconSite svg-class="drop-shadow-md" svg-color="#FF92CB" svg-width="51px" />
               <h4 class="site-title text-lg font-bold">
                  Game<span class="text-primary">Verse</span>
               </h4>
            </span>
         </div>
      </template>
      <template #submenulabel="{ item }">
         <p class="text-md font-extrabold text-white">{{ item.label }}</p>
      </template>
      <template #item="{ item, props }">
         <a v-ripple class="flex items-center" v-bind="props.action">
            <Component :is="item.icon" size="18" />
            <span class="text-md">{{ item.label }}</span>
         </a>
      </template>
      <template #end>
         <button class="mb-3 ml-[18px] flex w-full flex-row items-center gap-2">
            <CustomAvatar />
            <span class="inline-flex flex-col items-start">
               <span class="font-bold">{{ userStore.userData.username }}</span>
               <span class="text-sm">Admin</span>
            </span>
         </button>
      </template>
   </Menu>
</template>

<style scoped></style>
