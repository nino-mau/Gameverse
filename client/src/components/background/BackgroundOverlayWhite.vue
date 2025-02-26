/** --- Element used to add effect to the background --- */
<script setup>
import { defineProps } from 'vue';

defineProps({
   svgClass: {
      type: [String, Number],
      required: false,
   },
});
</script>

<template>
   <div class="background-element-white" :class="svgClass"></div>
</template>

<style scoped>
.background-element-white {
   filter: blur(350px);
   position: absolute;
   background-color: #ffffff;
   border-radius: 846px/860.5px;
   height: 100vh;
   width: 100vw;
   opacity: 0.39;
   z-index: -1000;
}
</style>
