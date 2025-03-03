<script setup>
// **** IMPORTS ****
import { ref, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

// *** Import Icons ***
import IconSite from './icons/IconSite.vue';
import IconChevronDown from './icons/IconChevronDown.vue';
import IconGameController from './icons/IconGameController.vue';
import IconLibrary from './icons/IconLibrary.vue';
import IconMedal from './icons/IconMedal.vue';
// eslint-disable-next-line no-unused-vars
const IconCircleUserProfile = defineAsyncComponent(
   () => import('./icons/IconCircleUserProfile.vue'),
);
// eslint-disable-next-line no-unused-vars
const IconNotifBell = defineAsyncComponent(() => import('./icons/IconNotifBell.vue'));
// eslint-disable-next-line no-unused-vars
const IconSearch = defineAsyncComponent(() => import('./icons/IconSearch.vue'));

// *** Import PrimeVue Components ***
import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';
// eslint-disable-next-line no-unused-vars
const Avatar = defineAsyncComponent(() => import('primevue/avatar'));

// **** LOGIC ****

// *** Handle Dropdown Menu ***
// Define the wrapper for the dropdown menu
const menu = ref();

// Define the items in the the dropdown menu
const items = ref([
   {
      label: 'Browse',
      icon: IconLibrary,
      iconProps: { svgColor: '#334155', svgWidth: '20' },
   },
   {
      label: 'Discover',
      icon: IconGameController,
      iconProps: { svgColor: '#334155', svgWidth: '20' },
   },
   {
      label: 'Ranking',
      icon: IconMedal,
      iconProps: { svgColor: '#334155', svgWidth: '20' },
   },
]);

// Function used on click of the button to open the menu
const toggle = (event) => {
   menu.value.toggle(event);
};

// *** Handle Routing ***

const router = useRouter();

function goToLoginPage() {
   router.push('/login');
}
function goToRegisterPage() {
   router.push('/register');
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
            <li class="hover-effect-text-underline">Home</li>
            <li class="hover-effect-text-underline">
               <span
                  class="games-link"
                  @click="toggle"
                  aria-haspopup="true"
                  aria-controls="overlay_tmenu"
               >
                  Games
                  <IconChevronDown svg-color="#ffffff" svg-width="22px" />
               </span>
               <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
                  <template #item="{ item }">
                     <a class="p-menuitem-link">
                        <span class="p-menuitem-icon">
                           <component v-if="item.icon" :is="item.icon" v-bind="item.iconProps" />
                        </span>
                        <span class="p-menuitem-text">{{ item.label }}</span>
                     </a>
                  </template>
               </TieredMenu>
            </li>
            <li class="hover-effect-text-underline">About</li>
            <li class="hover-effect-text-underline">Contact</li>
         </ul>
      </div>
      <!-- <div class="account-menu-container">
         <IconSearch
            svg-class="hover-effect-svg-stroke drop-shadow-sm"
            svg-color="#ffffff"
            svg-width="25px"
         />
         <IconNotifBell
            svg-class="hover-effect-svg-stroke drop-shadow-sm"
            svg-color="#ffffff"
            svg-width="25px"
         />
         <Avatar
            icon="pi pi-user"
            class="shadow-xl mr-0.5 ml-0.5 w-[2.7rem] h-[2.7rem]"
            size="large"
            shape="circle"
         >
            <IconCircleUserProfile
               svg-class="hover-effect-svg-stroke"
               svg-color="var(--color-secondary)"
               svg-width="32px"
            />
         </Avatar>
         <p class="username text-base">Username</p>
      </div> -->
      <div class="h-full flex flex-row justify-center items-center gap-4 mr-[4.5rem]">
         <Button
            @click="goToLoginPage"
            class="w-[88px] h-[39px] text-white text-base font-semibold"
            label="Sign-in"
            raised
         />
         <Button
            @click="goToRegisterPage"
            class="w-[88px] h-[39px] text-white border-white border-1 text-base font-semibold hover:text-secondary hover:bg-white active:bg-btn-active"
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
