<script setup>
// primevue
import { Avatar } from 'primevue';

// icons
import IconCircleUserProfile from './IconCircleUserProfile.vue';

//***===== Props =====***//

defineProps({
   shape: {
      type: String,
      default: 'circle',
   },
   customClass: {
      type: String,
      required: false,
   },
});
</script>

<template>
   <Avatar
      icon="pi pi-user"
      class="mr-0.5 ml-0.5 h-[2.5rem] w-[2.5rem] shadow-xl"
      size="large"
      :class="customClass"
      :shape="shape"
   >
      <IconCircleUserProfile
         svg-class="hover-effect-svg-stroke"
         svg-color="var(--color-secondary)"
         svg-width="27px"
      />
   </Avatar>
</template>

<style scoped></style>
