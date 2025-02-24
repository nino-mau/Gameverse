<script setup>
// *** Import Icons ***
import IconSite from './icons/IconSite.vue';
import IconCircleUserProfile from './icons/IconCircleUserProfile.vue';
import IconSearch from './icons/IconSearch.vue';
import IconNotifBell from './icons/IconNotifBell.vue';

// *** Import PrimeVue Components ***
import Dropdown from 'primevue/dropdown';
</script>

<template>
   <nav class="navbar">
      <div class="site-logo-container">
         <IconSite svg-color="#FF92CB" svg-width="51px" />
         <h4 class="site-title">GameVerse</h4>
      </div>
      <div class="link-container">
         <ul class="list">
            <li>Home</li>
            <li>Games</li>
            <li>About</li>
            <li>Contact</li>
         </ul>
      </div>
      <div class="account-menu-container">
         <IconSearch svg-color="#FFFFFF" svg-width="24px" />
         <IconNotifBell svg-color="#FFFFFF" svg-width="24px" />
         <IconCircleUserProfile svg-color="#FFFFFF" svg-width="35px" />
         <p class="username">Username</p>
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
   > .site-logo-container {
      grid-column: 1;
      display: inline-flex;
      align-items: center;
      gap: 0.7rem;
      height: 100%;
      width: fit-content;
      margin-left: 4.5rem;
      > .site-title {
         font-weight: 700;
         font-size: 18px;
      }
   }
   > .link-container {
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
            font-weight: 500;
            font-size: 14px;
         }
      }
   }
   > .account-menu-container {
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
}
</style>
