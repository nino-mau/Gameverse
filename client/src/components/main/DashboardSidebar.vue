<script setup>
// vue
import { ref, markRaw } from 'vue';
import { useRouter } from 'vue-router';

// libs
import { useUserStore } from '@/stores/userStore.js';

// primevue
import { Divider } from 'primevue';

// icons
import IconEmail from '../icons/IconEmail.vue';
import {
   Settings,
   MessageSquare,
   LogOut,
   LayoutDashboard,
   Gamepad2,
   Home,
   Users,
   Library,
   Phone,
   Info,
   Menu as IconMenu,
} from 'lucide-vue-next';
import IconSite from '../icons/IconSite.vue';

// components
import CustomAvatar from '../icons/CustomAvatar.vue';
import SidebarMenuItem from '../ui/SidebarMenuItem.vue';

/*==============================
============  MAIN  ============
===============================*/

// Init service and store
const router = useRouter();
const userStore = useUserStore();

//***===== State =====***//

// Init sub menu items for panel menu
const subPanelMenuItems = ref([
   {
      label: 'Navigation',
      icon: markRaw(IconMenu),
      expanded: true,
      items: [
         {
            label: 'Home',
            icon: markRaw(Home),
            command: () => {
               router.push('/');
            },
         },
         {
            label: 'Browse',
            icon: markRaw(Library),
            command: () => {
               router.push('/browse');
            },
         },
         {
            label: 'About',
            icon: markRaw(Info),
            command: () => {
               router.push('/about');
            },
         },
         {
            label: 'Contact',
            icon: markRaw(Phone),
            command: () => {
               router.push('/contact');
            },
         },
      ],
   },
]);

// Init slide menu items
const sideMenuItems = ref([
   {
      label: 'Home',
      icon: markRaw(Home),
      iconProps: { color: '#334155', size: '20' },
      command: () => {
         router.push('/');
      },
   },
   {
      label: 'Submenu',
      subItems: [
         {
            label: 'Router',
            icon: markRaw(IconEmail),

            items: [
               {
                  label: 'test',
                  icon: markRaw(IconEmail),
               },
               {
                  label: 'Unstyled',
                  icon: markRaw(IconEmail),
               },
            ],
         },
      ],
   },

   {
      label: 'Overview',
      icon: markRaw(LayoutDashboard),
      iconProps: { color: '#334155', size: '20' },
   },
   {
      label: 'Friends',
      icon: markRaw(Users),
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
]);
</script>

<template>
   <!-- Sidebar Menu -->
   <div
      class="bg-bg2 border-bg2 flex h-[100%] w-full flex-col rounded-[0px] pr-[1.5rem] pl-[1.5rem] text-white"
   >
      <!-- Site Logo -->
      <div class="flex flex-row items-center justify-center">
         <span class="flex items-center gap-1 px-2 py-2">
            <IconSite svg-class="drop-shadow-md" svg-color="#FF92CB" svg-width="51px" />
            <h4 class="site-title text-lg font-bold">
               Game<span class="text-primary">Verse</span>
            </h4>
         </span>
      </div>
      <Divider type="solid" />

      <h1 class="pr-[0.75rem] pl-[0.75rem] text-base font-semibold">General</h1>
      <div v-for="item in sideMenuItems" :key="item" class="w-full">
         <SidebarMenuItem :item="item" :index="sideMenuItems.indexOf(item)" />
      </div>
      <!-- Menu Items -->
      <!-- <template #submenulabel="{ item }">
         <p class="text-md font-extrabold text-white">{{ item.label }}</p>
      </template>
      <template #item="{ item, props }">
         <a v-ripple class="flex items-center" v-bind="props.action">
            <Component :is="item.icon" size="18" />
            <span class="text-md">{{ item.label }}</span>
         </a>
      </template> -->
      <!-- User Avatar Section -->
      <Divider type="solid" />
      <div>
         <button class="mb-3 ml-[10px] flex w-full flex-row items-start gap-1">
            <CustomAvatar shape="square" customClass="w-[2.6rem] h-[2.6rem]" />
            <span class="inline-flex flex-col items-start">
               <span class="text-md font-bold">@{{ userStore.userData.username }}</span>
               <span class="text-xs">{{ userStore.userData.email }}</span>
            </span>
         </button>
      </div>
   </div>
</template>

<style scoped></style>
