<script setup>
// vue
import { ref, markRaw } from 'vue';
import { useRouter } from 'vue-router';

// libs
import { useUserStore } from '@/stores/userStore.js';

// primevue
import { Divider } from 'primevue';

// icons
import {
   Settings,
   MessageSquare,
   LogOut,
   LayoutDashboard,
   Gamepad2,
   Home,
   Users,
} from 'lucide-vue-next';
import IconSite from '../icons/IconSite.vue';
import IconPhone from '../icons/IconPhone.vue';
import IconMenu from '../icons/IconMenu.vue';
import IconAbout from '../icons/IconAbout.vue';
import IconGameController from '../icons/IconGameController.vue';

// components
import CustomAvatar from '@/components/icons/CustomAvatar.vue';
import SidebarMenuItem from '@/components/ui/SidebarMenuItem.vue';

/*==============================
============  MAIN  ============
===============================*/

// Init service and store
const router = useRouter();
const userStore = useUserStore();

//***===== State =====***//

// Init slide menu items
const sideMenuItems = ref([
   {
      label: 'General',
      header: true,
   },
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
            label: 'Pages',
            icon: markRaw(IconMenu),
            items: [
               {
                  label: 'Browse',
                  icon: markRaw(IconGameController),
                  command: () => {
                     router.push('/browse');
                  },
               },
               {
                  label: 'Contact',
                  icon: markRaw(IconPhone),
                  command: () => {
                     router.push('/contact');
                  },
               },
               {
                  label: 'About',
                  icon: markRaw(IconAbout),
                  command: () => {
                     router.push('/about');
                  },
               },
            ],
         },
      ],
   },
   {
      label: 'Profile',
      header: true,
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
      command: () => {
         router.push('/dashboard/profileFriends');
      },
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
      class="bg-bg2 border-bg2 flex h-[100%] w-full flex-col rounded-[0px] pt-[.3rem] pr-[1.5rem] pb-[.5rem] pl-[1.5rem] text-white"
   >
      <!-- Site Logo -->
      <div>
         <div class="flex flex-row items-center justify-center">
            <span class="flex items-center gap-2 px-2 py-2">
               <IconSite svg-class="drop-shadow-md" svg-color="#FF92CB" svg-width="45px" />
               <h4 class="site-title text-lg font-bold">
                  Game<span class="text-primary">Verse</span>
               </h4>
            </span>
         </div>
         <Divider type="solid" class="mt-[0.3rem]" />
      </div>

      <!-- Menu Items -->
      <div role="list">
         <div v-for="item in sideMenuItems" :key="item" class="w-full">
            <SidebarMenuItem :item="item" :index="sideMenuItems.indexOf(item)" />
         </div>
      </div>

      <!-- User Avatar Section -->
      <div class="mt-auto">
         <Divider type="solid" />
         <button class="mb-3 flex w-full flex-row items-start gap-1">
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
