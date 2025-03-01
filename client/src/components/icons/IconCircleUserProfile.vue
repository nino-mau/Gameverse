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
      class="lucide lucide-circle-user"
   >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
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
         d="M14.5 13.009h-5c-1.38 0-2.5 1.12-2.5 2.503v3.978a8.95 8.95 0 0 0 5 1.519 8.95 8.95 0 0 0 5-1.519v-3.978a2.502 2.502 0 0 0-2.5-2.503Z"
         clip-rule="evenodd"
      />
      <path :fill="svgColor" d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path
         :fill="svgColor"
         d="M12 20a8 8 0 1 0 0-16.001A8 8 0 0 0 12 20Zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z"
      />
   </svg> -->
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
