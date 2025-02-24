<script setup>
import { defineProps } from 'vue';

defineProps({
   svgColor: String,
   svgWidth: [String, Number],
});
</script>

<template>
   <svg :width="svgWidth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
         :fill="svgColor"
         fill-rule="evenodd"
         d="m16.436 15.085 3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406ZM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
         clip-rule="evenodd"
      />
   </svg>
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
