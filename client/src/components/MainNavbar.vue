<script setup>
// **** IMPORTS ****
import { ref, defineAsyncComponent, markRaw } from 'vue';
import { useRouter } from 'vue-router';

// Import frameworks/libs
import { storeToRefs } from 'pinia';
import { useUserAuthStore } from '../stores/authStore.js';

// Icons
import IconSite from './icons/IconSite.vue';
import IconMedal from './icons/IconMedal.vue';
import { ChevronDown } from 'lucide-vue-next';
import IconLibrary from './icons/IconLibrary.vue';
import IconGameController from './icons/IconGameController.vue';
import IconChevronDownFilledHover from './icons/IconChevronDownFilledHover.vue';
// PrimeVue Components
import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';
import Popover from 'primevue/popover';

// Async
const Avatar = defineAsyncComponent(() => import('primevue/avatar'));
const IconCircleUserProfile = defineAsyncComponent(
   () => import('./icons/IconCircleUserProfile.vue'),
);
const IconNotifBell = defineAsyncComponent(() => import('./icons/IconNotifBell.vue'));
const IconSearch = defineAsyncComponent(() => import('./icons/IconSearch.vue'));

// **** INIT ****

// Init pinia store
const userStore = useUserAuthStore();
// Get reactive state from user Store
const { isUserLoggedIn, userData } = storeToRefs(userStore);

// **** LOGIC ****

// *** Handle Dropdown Menu ***

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

// *** Handle Account Menu Popover ***

// Init popover
const accountPopover = ref();

// True when popover is open
const isPopoverOpen = ref(false);

const toggleAccountPopover = (event) => {
   accountPopover.value.toggle(event);
   isPopoverOpen.value = !isPopoverOpen.value;
};
const onPopoverHide = () => {
   isPopoverOpen.value = false;
};

// *** Handle Routing ***

const router = useRouter();

function goToLoginPage() {
   router.push('/login');
}
function goToRegisterPage() {
   router.push('/register');
}

// onMounted(() => {
//    console.log('MainNavbar Mounted - isUserLoggedIn:', isUserLoggedIn.value); // Log on mount
// });

// watch(isUserLoggedIn, (newValue, oldValue) => {
//    // Watch isUserLoggedIn ref
//    console.log('isUserLoggedIn Ref changed in MainNavbar:', oldValue, '=>', newValue);
// });
</script>

<template>
   <nav class="navbar bg-bg2">
      <div class="site-logo-container">
         <IconSite svg-class="drop-shadow-md" svg-color="#FF92CB" svg-width="51px" />
         <h4 class="site-title text-lg font-bold">GameVerse</h4>
      </div>
      <div class="link-container">
         <ul class="list text-base font-normal">
            <li class="hover-effect-text-underline">Home</li>
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
                  <!-- <template #item="{ item }">
                     <a class="p-menuitem-link">
                        <span class="p-menuitem-icon">
                           <component v-if="item.icon" :is="item.icon" v-bind="item.iconProps" />
                        </span>
                        <span class="p-menuitem-text">{{ item.label }}</span>
                     </a>
                  </template> -->
                  <template #itemicon="{ item }">
                     <component :is="item.icon" v-bind="item.iconProps" />
                  </template>
               </TieredMenu>
            </li>
            <li class="hover-effect-text-underline">About</li>
            <li class="hover-effect-text-underline">Contact</li>
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
         <Avatar
            icon="pi pi-user"
            class="mr-0.5 ml-0.5 h-[2.5rem] w-[2.5rem] shadow-xl"
            size="large"
            shape="circle"
         >
            <IconCircleUserProfile
               svg-class="hover-effect-svg-stroke"
               svg-color="var(--color-secondary)"
               svg-width="27px"
            />
         </Avatar>
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
