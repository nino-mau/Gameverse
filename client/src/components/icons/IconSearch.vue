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
      :width="svgWidth"
      :class="svgClass"
      :stroke="svgColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-search"
   >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
   </svg>
   <!-- <svg
      role="img"
      :width="svgWidth"
      :class="svgClass"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
   >
      <path
         :fill="svgColor"
         fill-rule="evenodd"
         d="m16.436 15.085 3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406ZM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
         clip-rule="evenodd"
      />
   </svg> -->
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
