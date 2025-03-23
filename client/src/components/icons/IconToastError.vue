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
      :class="svgClass"
      :stroke="color"
      :width="width"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-circle-alert"
   >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
   </svg>
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
