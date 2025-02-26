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
         d="M6.744 8.744a1.053 1.053 0 0 0 0 1.49l4.547 4.557a.999.999 0 0 0 1.416 0l4.55-4.558a1.052 1.052 0 1 0-1.488-1.488l-3.77 3.776L8.23 8.745a1.051 1.051 0 0 0-1.487 0v-.001Z"
      />
   </svg>
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
