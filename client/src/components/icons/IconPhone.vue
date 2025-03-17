<script setup>
import { defineProps } from 'vue';
import { Phone } from 'lucide-vue-next';

const props = defineProps({
   size: Number,
   stroke: [String, Number],
});
</script>

<template>
   <Phone :size="props.size" :stroke="props.stroke" />
</template>

<style scoped></style>
