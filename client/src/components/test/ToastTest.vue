<script setup>
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const showToast = () => {
   toast('This is a success message!', {
      theme: 'colored',
      type: 'success',
      autoClose: 3000, // Close after 3 seconds
   });
};

onMounted(() => {
   toast('Welcome to the page!', { type: 'info' });
});
</script>

<template>
   <div>
      <button @click="showToast">Show Toast</button>
   </div>
</template>

<style scoped></style>
