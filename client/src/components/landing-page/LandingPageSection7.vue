<script setup>
// *** Import Background Element ***
import BackgroundOverlaySplit from '../background/BackgroundOverlaySplit.vue';
</script>

<template>
   <div>
      <BackgroundOverlaySplit svg-color1="#5078a4" svg-color2="#a45078" svg-width="100vw" />
   </div>
</template>

<style scoped>
/* This element gets an angled right edge */
.background-section-left-skewed {
   clip-path: polygon(0 0, 100% 0, 50% 100%, 0 100%);
}

/* This element gets an angled left edge */
.background-section-right-skewed {
   clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%);
}
</style>
