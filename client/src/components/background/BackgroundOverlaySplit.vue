<script setup>
import { defineProps } from 'vue';

defineProps({
   svgClass: {
      type: [String, Number],
      required: false,
   },
   svgWidth: [String, Number],
   svgColor1: [String, Number],
   svgColor2: [String, Number],
});
</script>

<template>
   <svg
      :width="svgWidth"
      :class="svgClass"
      viewBox="0.508 292.548 1438.9951 438.904"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         :fill="svgColor1"
         stroke="none"
         d="M 852.848 292.548 L 1439.503 292.557 L 1439.491 730.912 L 1142.961 730.907 L 1143.021 730.997 L 602.945 730.997 L 852.46 292.997 L 852.848 293.582 L 852.848 292.548 Z"
      />
      <path
         :fill="svgColor2"
         stroke="none"
         d="M 579.323 730.997 L 578.668 730.009 L 578.668 731.408 L 0.542 731.452 L 0.508 293.046 L 288.78 293.024 L 288.762 292.997 L 828.839 292.997 L 579.323 730.997 Z"
      />
   </svg>
</template>

<style scoped>
svg {
   z-index: -1;
}
</style>
