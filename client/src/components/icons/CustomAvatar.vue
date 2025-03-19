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
   iconSize: {
      type: String,
      required: false,
      default: '27px',
   },
});
</script>

<template>
   <Avatar
      icon="pi pi-user"
      class="avatar shadow-xl"
      size="large"
      :class="customClass"
      :shape="shape"
   >
      <IconCircleUserProfile
         svg-class="hover-effect-svg-stroke"
         svg-color="var(--color-secondary)"
         :svg-width="iconSize"
      />
   </Avatar>
</template>

<style scoped>
.avatar {
   margin-right: calc(var(--spacing) * 0.5);
   margin-left: calc(var(--spacing) * 0.5);
   height: 2.5rem;
   width: 2.5rem;
}
</style>
