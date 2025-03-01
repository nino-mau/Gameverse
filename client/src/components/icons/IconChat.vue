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
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-messages-square"
   >
      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
   </svg>
   <!-- <svg
      role="img"
      :width="svgWidth"
      :class="svgClass"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
   >
      <path
         :fill="svgColor"
         d="M 2 5 L 2 21 L 6 21 L 6 26.09375 L 7.625 24.78125 L 12.34375 21 L 22 21 L 22 5 Z M 4 7 L 20 7 L 20 19 L 11.65625 19 L 11.375 19.21875 L 8 21.90625 L 8 19 L 4 19 Z M 24 9 L 24 11 L 28 11 L 28 23 L 24 23 L 24 25.90625 L 20.34375 23 L 12.84375 23 L 10.34375 25 L 19.65625 25 L 26 30.09375 L 26 25 L 30 25 L 30 9 Z"
      />
   </svg> -->
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
