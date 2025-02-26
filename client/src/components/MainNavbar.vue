<script setup>
import { ref } from 'vue';

// *** Import Icons ***
import IconSite from './icons/IconSite.vue';
import IconCircleUserProfile from './icons/IconCircleUserProfile.vue';
import IconSearch from './icons/IconSearch.vue';
import IconNotifBell from './icons/IconNotifBell.vue';
import IconChevronDown from './icons/IconChevronDown.vue';

// *** Import PrimeVue Components ***
import TieredMenu from 'primevue/tieredmenu';

// *** Logic for the navbar games dropdown menu ***

// Define the wrapper for the dropdown menu
const menu = ref();

// Define the items in the the dropdown menu
const items = ref([
   {
      label: 'Browse',
   },
   {
      label: 'Discover',
   },
   {
      label: 'Ranking',
   },
]);

// Function used on click of the button to open the menu
const toggle = (event) => {
   menu.value.toggle(event);
};
</script>

<template>
   <nav class="navbar">
      <div class="site-logo-container">
         <IconSite svg-class="shadow-effect-svg" svg-color="#FF92CB" svg-width="51px" />
         <h4 class="site-title">GameVerse</h4>
      </div>
      <div class="link-container">
         <ul class="list">
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
               <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
            </li>
            <li class="hover-effect-text-underline">About</li>
            <li class="hover-effect-text-underline">Contact</li>
         </ul>
      </div>
      <div class="account-menu-container">
         <IconSearch
            svg-class="hover-effect-svg-white shadow-effect-svg"
            svg-color="#e3e0fc"
            svg-width="24px"
         />
         <IconNotifBell
            svg-class="hover-effect-svg-white shadow-effect-svg"
            svg-color="#e3e0fc"
            svg-width="24px"
         />
         <IconCircleUserProfile
            svg-class="hover-effect-svg-white shadow-effect-svg"
            svg-color="#e3e0fc"
            svg-width="35px"
         />
         <p class="username shadow-effect-txt">Username</p>
      </div>
   </nav>
</template>

<style scoped>
.navbar {
   display: inline-grid;
   grid-template-columns: auto auto min-content;
   width: 100%;
   height: clamp(3rem, 6.7vh, 4.25rem);
   background-color: #393273;
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
   > .site-title {
      font-weight: 700;
      font-size: 1.1rem;
   }
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
         color: #ffffff;
         font-size: 0.87rem;
         font-weight: 400;
      }
      > li:hover {
         color: #ffffff;
      }
   }
   /* Contains the games link which is a dropdown menu */
   & .games-link {
      display: flex;
      cursor: pointer;
      font-size: 0.87rem;
      font-weight: 400;
      background: none;
      border: none;
      color: #ffffff;
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
   > .username {
      font-size: 14px;
   }
}
</style>
