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
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         :fill="svgColor"
         d="M24.997 14.5c0 0 0 0-0 0-0.828 0-1.5-0.671-1.5-1.5s0.671-1.5 1.5-1.5c0.828 0 1.5 0.671 1.5 1.5 0 0 0 0 0 0v0c0 0.828-0.671 1.5-1.5 1.5v0zM20.499 17.5c0 0 0 0-0 0-0.828 0-1.5-0.671-1.5-1.5s0.671-1.5 1.5-1.5c0.828 0 1.5 0.671 1.5 1.5 0 0 0 0 0 0v0c-0 0.828-0.671 1.5-1.5 1.5v0zM11.501 14.5h-2.999v2.999h-1.5v-2.999h-2.999v-1.5h2.999v-2.999h1.5v2.999h2.999zM30.996 17.5v-7.498l-7.498-4.499-7.498 4.499-7.498-4.499-7.498 4.499v7.498l14.996 8.997z"
      />
   </svg>
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
