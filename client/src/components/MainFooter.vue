<script setup>
// *** Import Icons ***
import IconSite from './icons/IconSite.vue';
import IconGithub from './icons/brands/IconGithub.vue';
import IconTwitch from './icons/brands/IconTwitch.vue';
import IconLinkedin from './icons/brands/IconLinkedin.vue';
import IconInsta from './icons/brands/IconInsta.vue';
</script>

<template>
   <div
      class="main-footer w-full h-[25vh] bg-bg2 flex flex-col justify-center items-center gap-[24px]"
   >
      <div class="top-section-container flex flex-row gap-[8px]">
         <IconSite svg-color="#ffffff" svg-class="custom-site-logo" />
         <h4 class="text-lg font-extrabold">GameVerse</h4>
      </div>
      <ul class="flex flex-row gap-[16px] text-xs font-medium">
         <li>Home</li>
         <li>Games</li>
         <li>Browse</li>
         <li>Contact</li>
         <li>About</li>
      </ul>
      <ul class="flex flex-row justify-center gap-[16px]">
         <li><IconGithub svg-color="#ffffff" svg-width="17" /></li>
         <li><IconInsta svg-color="#ffffff" svg-width="17" /></li>
         <li><IconLinkedin svg-color="#ffffff" svg-width="17" /></li>
         <li><IconTwitch svg-color="#ffffff" svg-width="17" /></li>
      </ul>
      <p class="text-xs font-medium text-center">© 2025 GameVerse, Inc.</p>
   </div>
</template>

<style scoped>
.custom-site-logo {
   width: 29px;
}
</style>
