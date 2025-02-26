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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
   >
      <path
         :fill="svgColor"
         fill-rule="evenodd"
         d="M6.485 17.669a2 2 0 0 0 2.829 0l-2.829-2.83a2 2 0 0 0 0 2.83Zm4.897-12.191-.725.725c-.782.782-2.21 1.813-3.206 2.311l-3.017 1.509c-.495.248-.584.774-.187 1.171l8.556 8.556c.398.396.922.313 1.171-.188l1.51-3.016c.494-.988 1.526-2.42 2.311-3.206l.725-.726a5.048 5.048 0 0 0 .64-6.356 1.01 1.01 0 1 0-1.354-1.494c-.023.025-.046.049-.066.075a5.043 5.043 0 0 0-4.72-.457 5.037 5.037 0 0 0-1.638 1.095v.001Z"
         clip-rule="evenodd"
      />
   </svg>
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
