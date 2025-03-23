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
      class="lucide lucide-info"
   >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
   </svg>
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
