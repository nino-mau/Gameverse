<script setup>
// *** Import Built-in Components
import { defineProps } from 'vue';

// *** Import PrimeVue Components ***
import Button from 'primevue/button';

defineProps({
   btnClass: {
      type: [String, Number],
      required: false,
   },
   btnLabel: [String, Number],
   btnIcon: Object,
   btnIconWidth: [String, Number],
   btnIconColor: [String, Number],
});
</script>

<template>
   <Button :class="['custom-button1', btnClass]" raised>
      <span class="text">{{ btnLabel }}</span>
      <span class="icon">
         <component :is="btnIcon" :svg-width="btnIconWidth" :svg-color="btnIconColor" />
      </span>
   </Button>
</template>

<style scoped>
.custom-button1 {
   overflow: hidden;
}
/* -- Handle Hover Effect Btn1 -- */
.custom-button1 .text,
.custom-button1 .icon {
   position: relative;
   transition: transform 0.3s; /* Smooth transition for animations */
}
.custom-button1 .text {
   transform: translateY(0);
   line-height: 50px; /* Vertically center the text */
}
.custom-button1 .icon {
   transform: translateY(-120%);
   position: absolute;
   line-height: 10px; /* Vertically center the icon */
}
.custom-button1:hover .text {
   transform: translateY(300%);
}
.custom-button1:hover .icon {
   transform: translateY(0);
}
</style>
