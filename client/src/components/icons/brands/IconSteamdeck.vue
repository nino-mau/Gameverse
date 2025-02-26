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
      xmlns="http://www.w3.org/2000/svg"
      :width="svgWidth"
      :class="svgClass"
      viewBox="0 0 32 42"
   >
      <path
         :fill="svgColor"
         d="M10.748 0v7.54c7.424 0 13.465 6.038 13.465 13.46 0 7.422-6.041 13.46-13.465 13.46V42c11.58 0 21-9.42 21-21s-9.42-21-21-21Zm0 10.52c-5.798 0-10.5 4.702-10.496 10.5a10.499 10.499 0 1 0 10.496-10.5Z"
      />
   </svg>
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
