<script setup>
/*==============================
===========  IMPORTS  ==========
===============================*/

import { ref, defineAsyncComponent, markRaw } from 'vue';
import { useRouter } from 'vue-router';

// frameworks/libs
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore.js';

// icons
import IconSite from '@/components/icons/IconSite.vue';
import IconMedal from '@/components/icons/IconMedal.vue';
import { ChevronDown } from 'lucide-vue-next';
import IconLibrary from '@/components/icons/IconLibrary.vue';
import IconGameController from '@/components/icons/IconGameController.vue';
import IconChevronDownFilledHover from '@/components/icons/IconChevronDownFilledHover.vue';

// primeVue
import Button from 'primevue/button';
import Popover from 'primevue/popover';
import TieredMenu from 'primevue/tieredmenu';

// async
const CustomAvatar = defineAsyncComponent(() => import('../icons/CustomAvatar.vue'));
const IconNotifBell = defineAsyncComponent(() => import('@/components/icons/IconNotifBell.vue'));
const IconSearch = defineAsyncComponent(() => import('@/components/icons/IconSearch.vue'));

/*==============================
============  MAIN  ============
===============================*/

const router = useRouter();
// Init pinia store
const userStore = useUserStore();
// Get reactive state from user Store
const { isUserLoggedIn, userData } = storeToRefs(userStore);

//***===== Dropdown Menu =====***//

// Init dropdown menu
const dropdownMenu = ref();

// True when dropdown is open
const isDropdownOpen = ref(false);

// Dropdown menu content
const items = ref([
   {
      label: 'Browse',
      icon: markRaw(IconLibrary),
      iconProps: { svgColor: '#334155', svgWidth: '20' },
      command: () => {
         router.push('/browse');
      },
   },
   {
      label: 'Discover',
      icon: markRaw(IconGameController),
      iconProps: { svgColor: '#334155', svgWidth: '20' },
   },
   {
      label: 'Ranking',
      icon: markRaw(IconMedal),
      iconProps: { svgColor: '#334155', svgWidth: '20' },
   },
]);

// Open menu dropdown menu
const toggleDropdownMenu = (event) => {
   dropdownMenu.value.toggle(event);
   isDropdownOpen.value = !isDropdownOpen.value;
};
const onMenuHide = () => {
   isDropdownOpen.value = false;
};

//***===== Popover Menu =====***//

// Init popover
const accountPopover = ref();

// True when popover is open
const isPopoverOpen = ref(false);

// Open account popover
const toggleAccountPopover = (event) => {
   accountPopover.value.toggle(event);
   isPopoverOpen.value = !isPopoverOpen.value;
};
const onPopoverHide = () => {
   isPopoverOpen.value = false;
};

//***===== Router =====***//

function goToHomePage() {
   router.push('/');
}
function goToLoginPage() {
   router.push('/login');
}
function goToRegisterPage() {
   router.push('/register');
}
function goToDashboardPage() {
   router.push('/dashboard');
}
function goToTestPage() {
   router.push('/test');
}
</script>

<template>
   <nav class="navbar bg-bg2">
      <div class="site-logo-container">
         <IconSite svg-class="drop-shadow-md" svg-color="#FF92CB" svg-width="51px" />
         <h4 class="site-title text-lg font-bold">GameVerse</h4>
      </div>
      <div class="link-container">
         <ul class="list text-base font-normal">
            <li
               role="link"
               @click="goToHomePage"
               class="hover-effect-text-underline cursor-pointer"
            >
               Home
            </li>
            <li class="hover-effect-text-underline after:w-[75%]">
               <span
                  :class="['games-link', isDropdownOpen ? '' : 'hover-icon-spin']"
                  @click="toggleDropdownMenu"
                  aria-haspopup="true"
                  aria-controls="overlay_tmenu"
               >
                  Games
                  <ChevronDown
                     :size="16"
                     color="white"
                     :stroke-width="3"
                     :class="[
                        'custom-transition-state',
                        isDropdownOpen ? 'rotate-[-90]' : ['rotate-270', 'hover-icon'],
                     ]"
                  />
               </span>
               <TieredMenu
                  ref="dropdownMenu"
                  id="overlay_tmenu"
                  :model="items"
                  @hide="onMenuHide"
                  popup
               >
                  <template #itemicon="{ item }">
                     <component :is="item.icon" v-bind="item.iconProps" />
                  </template>
               </TieredMenu>
            </li>
            <li class="hover-effect-text-underline">Social</li>
            <li
               v-if="userStore.isUserLoggedIn"
               @click="goToDashboardPage"
               class="hover-effect-text-underline"
            >
               Dashboard
            </li>
            <li v-else class="hover-effect-text-underline">About</li>
            <li class="hover-effect-text-underline" @click="goToTestPage">Test</li>
         </ul>
      </div>
      <div v-if="isUserLoggedIn === true" class="account-menu-container">
         <IconSearch
            svg-class="hover-effect-svg-stroke drop-shadow-sm"
            svg-color="#ffffff"
            svg-width="22px"
         />
         <IconNotifBell
            svg-class="hover-effect-svg-stroke drop-shadow-sm"
            svg-color="#ffffff"
            svg-width="22px"
         />
         <CustomAvatar />
         <a
            role="button"
            aria-label="Open account menu"
            class="hover-icon-spin flex flex-row items-center justify-center gap-[2px]"
            @click="toggleAccountPopover"
            aria-haspopup
         >
            <p class="username text-base">
               {{ userData?.username }}
            </p>
            <IconChevronDownFilledHover
               svg-width="12"
               svg-color="#ffffff"
               :popover-state="isPopoverOpen"
            />
         </a>
         <Popover ref="accountPopover" class="left-[86vw]" @hide="onPopoverHide">
            <div class="grid items-center justify-center">
               <Button
                  @click="userStore.logoutUser"
                  class="border-primary text-primary hover:bg-primary h-[40px] w-[110px] border-2 text-base font-semibold hover:text-white active:bg-[#f472b6]"
                  label="Sign-out"
                  variant="outlined"
                  raised
               />
            </div>
         </Popover>
      </div>
      <div
         v-if="isUserLoggedIn === false"
         class="mr-[4.5rem] flex h-full flex-row items-center justify-center gap-3"
      >
         <Button
            @click="goToLoginPage"
            class="h-[39px] w-[88px] text-base font-semibold text-white"
            label="Sign-in"
            raised
         />
         <Button
            @click="goToRegisterPage"
            class="hover:text-secondary active:bg-btn-active h-[39px] w-[88px] border-1 border-white text-base font-semibold text-white hover:bg-white"
            label="Sign-up"
            variant="outlined"
            raised
         />
      </div>
   </nav>
</template>

<style scoped>
.navbar {
   display: inline-grid;
   grid-template-columns: auto auto min-content;
   width: 100%;
   height: clamp(3rem, 6.7vh, 4.25rem);
}

/* -- Contains the site logo and the site name -- */
.site-logo-container {
   grid-column: 1;
   display: inline-flex;
   align-items: center;
   gap: 0.7rem;
   height: 100%;
   width: fit-content;
   margin-left: 4.5rem;
}

/* -- Contains the link to other pages -- */
.link-container {
   grid-column: 2;
   display: inline-flex;
   align-items: center;
   justify-content: end;
   margin-right: 3.5rem;
   > .list {
      display: inline-flex;
      gap: 3.25rem;
      flex-direction: row;
      align-items: center;
      list-style-type: none;
      > li {
         position: relative;
      }
   }
   /* Contains the games link which is a dropdown menu */
   & .games-link {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 3px;
      cursor: pointer;
      background: none;
      border: none;
   }
}

/* -- Contains the search icon, notification icon and user profile icon -- */
.account-menu-container {
   grid-column: 3;
   justify-self: flex-end;
   display: inline-flex;
   align-items: center;
   gap: 0.4rem;
   width: fit-content;
   height: 100%;
   margin-right: 4.5rem;
}
</style>
