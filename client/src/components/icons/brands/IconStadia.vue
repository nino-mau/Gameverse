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
      viewBox="0 0 42 28"
   >
      <path
         :fill="svgColor"
         d="M11.42 10.553a31.987 31.987 0 0 1 27.615.46c.46.345 1.15 0 1.266-.46l1.61-4.948c.23-.46 0-1.15-.575-1.38A39.123 39.123 0 0 0 .488 8.135a1.15 1.15 0 0 0-.345 1.496l3.797 8.4c.23.575.92.92 1.496.69 4.257-1.61 10.816-3.222 17.49-2.301-4.603.805-8.17 2.416-11.046 4.142a1.15 1.15 0 0 0-.346 1.496l2.301 5.293c.23.46.806.576 1.151.23.92-.92 1.841-1.61 2.647-2.07 3.682-2.072 8.745-3.683 15.534-3.338a1.15 1.15 0 0 0 1.15-.805l1.726-5.178c.23-.46 0-1.15-.46-1.38a35.095 35.095 0 0 0-24.28-4.258h.116Z"
      />
   </svg>
</template>

<style scoped>
svg {
   display: inline-block;
}
</style>
