<script setup>
// *** Import Illustration ***
import IlluAllPlatforms1 from './illustrations/IlluAllPlatforms1.vue';

// *** Import Icons ***
import IconSteam from './icons/brands/IconSteam.vue';
import IconXbox from './icons/brands/IconXbox.vue';
import IconSteamdeck from './icons/brands/IconSteamdeck.vue';
import IconStadia from './icons/brands/IconStadia.vue';
import IconShadow from './icons/brands/IconShadow.vue';
import IconRogAlly from './icons/brands/IconRogAlly.vue';
import IconPlaystation from './icons/brands/IconPlaystation.vue';
import IconLinuxMint from './icons/brands/IconLinuxMint.vue';
import IconGog from './icons/brands/IconGog.vue';
import IconEpicGames from './icons/brands/IconEpicGames.vue';
import IconAndroid from './icons/brands/IconAndroid.vue';
</script>

<template>
   <div class="platforms-section-container">
      <div class="illustrations">
         <IlluAllPlatforms1 svg-width="800" />
      </div>
      <h1 class="title">
         Browse Games on <span class="title-highlight-section">All Platforms !</span>
      </h1>
      <div class="brands-section-container">
         <IconSteam svg-class="brands-icons" svg-color="#ffffff" />
         <IconXbox svg-class="brands-icons" svg-color="#ffffff" />
         <IconSteamdeck svg-class="brands-icons" svg-color="#ffffff" />
         <IconStadia svg-class="brands-icons" svg-color="#ffffff" />
         <IconShadow svg-class="brands-icons" svg-color="#ffffff" />
         <IconRogAlly svg-class="brands-icons" svg-color="#ffffff" />
         <IconPlaystation svg-class="brands-icons" svg-color="#ffffff" />
         <IconLinuxMint svg-class="brands-icons" svg-color="#ffffff" />
         <IconGog svg-class="brands-icons" svg-color="#ffffff" />
         <IconEpicGames svg-class="brands-icons" svg-color="#ffffff" />
         <IconAndroid svg-class="brands-icons" svg-color="#ffffff" />
      </div>
   </div>
</template>

<style scoped>
.platforms-section-container {
   height: 100vh;
   margin-top: 5rem;
   > .illustrations {
      display: flex;
      justify-content: center;
      margin-top: 5rem;
      margin-bottom: 1rem;
   }
   > .title {
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
      > .title-highlight-section {
         color: var(--primary-color);
      }
   }
   > .brands-section-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 4rem;
      > .brands-icons {
         width: 42px;
         height: 42px;
      }
   }
}
</style>
