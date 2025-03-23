<script setup>
import { defineProps } from 'vue';

defineProps({
   color: {
      type: String,
      default: '#ffffff',
   },
   width: {
      type: [String, Number],
      default: '100%',
   },
   svgClass: {
      type: [String, Number],
      required: false,
   },
});
</script>

<template>
   <svg
      role="img"
      :width="width"
      :class="svgClass"
      :stroke="color"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-circle-check-big"
   >
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
      <path d="m9 11 3 3L22 4" />
   </svg>
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
