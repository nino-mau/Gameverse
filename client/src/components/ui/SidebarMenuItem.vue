<script setup>
// vue
import { defineProps, ref } from 'vue';

// primevue
import { PanelMenu } from 'primevue';

/*==============================
============  MAIN  ============
===============================*/

// Define props
const props = defineProps({
   item: {
      type: Object,
      default: () => ({}),
   },
   index: {
      type: Number,
      default: 0,
   },
});
</script>

<template>
   <a
      v-if="props.item.label !== 'Submenu'"
      v-ripple
      class="focus:text-primary inline-flex w-full flex-row items-center gap-[0.5rem] rounded-md pt-[0.5rem] pr-[0.75rem] pb-[0.5rem] pl-[0.75rem] text-white hover:bg-white hover:text-black focus:font-semibold"
      @click="props.item.command"
   >
      <Component :is="props.item.icon" size="18" />

      <span class="text-base">{{ props.item.label }}</span>
   </a>
   <PanelMenu v-else :model="props.item.subItems" class="m-0 p-0">
      <template #item="{ item }">
         <a
            v-ripple
            class="focus:text-primary inline-flex w-full flex-row items-center gap-[0.5rem] rounded-md pt-[0.5rem] pr-[0.75rem] pb-[0.5rem] pl-[0.75rem] text-base text-white hover:bg-white hover:text-black focus:font-semibold"
         >
            <Component :is="item.icon" class="sub-item-icon" />
            <span class="text-inherit">{{ item.label }}</span>
         </a>
      </template>
   </PanelMenu>
</template>

<style scoped>
:deep(.p-panelmenu-panel) {
   padding: 0;
   background-color: transparent;
   border: none;
}
:deep(.sub-item-icon) {
   stroke: #ffffff;
   width: 20px;
   height: 20px;
}
:deep(.sub-item-icon:hover) {
   stroke: #000000;
}
</style>
