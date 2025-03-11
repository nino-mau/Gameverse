<script setup>
// *** Import Icons ***
import IconSite from '@/components/icons/IconSite.vue';
import IconGithub from '@/components/icons/brands/IconGithub.vue';
import IconTwitch from '@/components/icons/brands/IconTwitch.vue';
import IconLinkedin from '@/components/icons/brands/IconLinkedin.vue';
import IconInsta from '@/components/icons/brands/IconInsta.vue';
</script>

<template>
   <div
      class="main-footer bg-bg2 bottom-0 flex h-[25vh] w-full flex-col items-center justify-center gap-[24px]"
   >
      <div class="top-section-container flex flex-row gap-[8px]">
         <IconSite svg-color="#ffffff" svg-class="custom-site-logo" />
         <h4 class="text-lg font-extrabold">GameVerse</h4>
      </div>
      <ul class="flex flex-row gap-[16px] text-xs font-medium">
         <li class="hover:text-primary">Home</li>
         <li class="hover:text-primary">Games</li>
         <li class="hover:text-primary">Browse</li>
         <li class="hover:text-primary">Contact</li>
         <li class="hover:text-primary">About</li>
      </ul>
      <ul class="flex flex-row justify-center gap-[16px]">
         <li><IconGithub svg-color="#ffffff" svg-width="17" svg-class="hvr-float" /></li>
         <li><IconInsta svg-color="#ffffff" svg-width="17" svg-class="hvr-float" /></li>
         <li><IconLinkedin svg-color="#ffffff" svg-width="17" svg-class="hvr-float" /></li>
         <li><IconTwitch svg-color="#ffffff" svg-width="17" svg-class="hvr-float" /></li>
      </ul>
      <p class="text-center text-xs font-medium">© 2025 GameVerse, Inc.</p>
   </div>
</template>

<style scoped>
.custom-site-logo {
   width: 29px;
}
</style>
