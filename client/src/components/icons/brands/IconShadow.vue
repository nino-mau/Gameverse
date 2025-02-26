<script setup>
import { defineProps } from 'vue';

defineProps({
   svgColor: String,
   svgWidth: [String, Number],
   svgClass: {
      type: [String, Number],
      required: false,
   },
});
</script>

<template>
   <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      :width="svgWidth"
      :class="svgClass"
      viewBox="0 0 42 42"
   >
      <path
         :fill="svgColor"
         d="M21 0C9.402 0 0 9.402 0 21c0 6.15 2.644 11.682 6.857 15.523a7.8 7.8 0 0 1-.35-2.317 7.793 7.793 0 1 1 10.31 7.377c1.352.273 2.75.417 4.183.417 11.598 0 21-9.402 21-21S32.598 0 21 0Z"
      />
   </svg>
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
