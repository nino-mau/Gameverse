<script setup>
// vue
import { defineProps, ref } from 'vue';

// primevue
import { PanelMenu } from 'primevue';

/*==============================
============  MAIN  ============
===============================*/

// bool to track state of panel item (dropdown menu)
let isPanelOpen = ref(false);

//***===== Functions =====***//

function onPanelOpen() {
   isPanelOpen.value = true;
   console.log(isPanelOpen.value);
}
function onPanelClose() {
   isPanelOpen.value = false;
   console.log(isPanelOpen.value);
}

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
   <!-- Title -->
   <div v-if="props.item.header" class="mt-[0.75rem] mb-[0.75rem]">
      <h1 class="text-base font-semibold">
         {{ props.item.label }}
      </h1>
   </div>

   <!-- Normal Menu Item -->
   <a
      v-else-if="props.item.label !== 'Submenu'"
      v-ripple
      class="focus:text-primary inline-flex w-full flex-row items-center gap-[0.5rem] rounded-md pt-[0.5rem] pr-[0.75rem] pb-[0.5rem] pl-[0.75rem] text-white hover:bg-white hover:text-black focus:font-semibold"
      @click="props.item.command"
      role="listitem"
      tabindex="0"
   >
      <Component :is="props.item.icon" size="18" />

      <span class="text-base">{{ props.item.label }}</span>
   </a>

   <!-- Dropdown Menu Item -->
   <PanelMenu
      v-else
      :model="props.item.subItems"
      class="m-0 p-0"
      @panel-open="onPanelOpen"
      @panel-close="onPanelClose"
   >
      <template #item="{ item }">
         <a
            v-ripple
            class="focus:text-primary inline-flex w-full flex-row items-center gap-[0.5rem] rounded-md pt-[0.5rem] pr-[0.75rem] pb-[0.5rem] pl-[0.75rem] text-base text-white hover:bg-white hover:text-black focus:font-semibold"
            @click="onPanelClick"
            role="listitem"
         >
            <!-- Item Icon -->
            <Component :is="item.icon" class="sub-item-icon" />
            <span class="text-inherit">{{ item.label }}</span>
            <!-- Chevron Icon Down -->
            <span
               v-if="item.items"
               :class="[
                  'panel-menu-chevron-icon pi pi-angle-down',
                  { 'panel-menu-chevron-icon--opened': isPanelOpen },
               ]"
            />
         </a>
      </template>
   </PanelMenu>
</template>

<style scoped>
/* -- Style chevron icon of panel menu -- */
.panel-menu-chevron-icon {
   margin-left: auto;
   color: white;
   transition: transform 0.2s;
}
/* Apply link hover to icon */
a:hover .panel-menu-chevron-icon::before {
   color: #000000;
}
/* Used to animate panel menu when it's opened */
.panel-menu-chevron-icon--opened {
   transform: rotate(-180deg) !important;
}

/* -- Remove default transitions effect and focus effect -- */
:deep(.p-panelmenu-item-content) {
   transition: none !important;
}
:deep(.p-panelmenu-header-content) {
   background-color: transparent !important;
   transition: none !important;
}
/* Focus effect changing text font weight */
:deep(.p-panelmenu-header:focus) {
   font-weight: 600;
}

/* Remove default primevue styling */
:deep(.p-panelmenu-panel) {
   padding: 0;
   background-color: transparent;
   border: none;
}

/* Custom styling for panel component icon */
:deep(.sub-item-icon) {
   stroke: #ffffff !important;
   width: 18px;
   height: 18px;
}

/* Apply link hover to icon */
:deep(a:hover .sub-item-icon) {
   stroke: #000000 !important;
}
</style>
