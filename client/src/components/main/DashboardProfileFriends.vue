<script setup>
// vue
import { ref } from 'vue';

// primevue
import { Divider, DataView } from 'primevue';

// icons
import CustomAvatar from '../icons/CustomAvatar.vue';

/*==============================
============  MAIN  ============
===============================*/

//***===== State =====***//

// Store data in objects about users friends
const friendsData = ref([
   {
      name: 'Friends 1',
   },
   {
      name: 'Friends 2',
   },
   {
      name: 'Friends 3',
   },
   {
      name: 'Friends 4',
   },
   {
      name: 'Friends 1',
   },
   {
      name: 'Friends 2',
   },
   {
      name: 'Friends 3',
   },
   {
      name: 'Friends 4',
   },
   {
      name: 'Friends 1',
   },
   {
      name: 'Friends 2',
   },
   {
      name: 'Friends 3',
   },
   {
      name: 'Friends 4',
   },
]);

//***===== Functions =====***//

//***===== Lifecycle =====***//
</script>

<template>
   <!-- Friends Page -->
   <div class="flex h-full w-full flex-row rounded-2xl">
      <!-- Friends Features -->
      <div class="h-full w-[75%] pr-[1rem]">
         <div class="bg-bg2 h-full w-full rounded-xl"></div>
      </div>
      <!-- Friends List -->
      <div class="h-full w-[25%]">
         <div class="bg-bg2 flex h-full w-full flex-col justify-between rounded-xl p-[1.5rem]">
            <!-- Header -->
            <div class="mb-[35px]">
               <h3 class="mb-2 text-2xl font-bold">Friends</h3>
               <p class="text-sm opacity-85">Start New Conversation</p>
            </div>
            <!-- List -->
            <DataView :value="friendsData" paginator :rows="8" class="bg-transparent">
               <!-- Friend Item Container -->
               <template #list="slotProps">
                  <div class="flex flex-col gap-[.8rem]">
                     <div v-for="(item, index) in slotProps.items" :key="index">
                        <div
                           class="hover:bg-secondary flex flex-col gap-4 rounded-xl bg-transparent p-2 sm:flex-row sm:items-center"
                        >
                           <!-- Avatar -->
                           <CustomAvatar
                              customClass="w-[3rem] h-[3rem]"
                              shape="square"
                              icon-size="1.9rem"
                           />
                           <div>
                              <!-- Name -->
                              <h4 class="font-semibold text-white">{{ item.name }}</h4>
                              <!-- Status -->
                              <p class="text-sm text-white opacity-75">Online</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </template>
            </DataView>
         </div>
      </div>
   </div>
</template>

<style scoped>
/* --- Custom @DataView (Friend List) --- */

/* Item */
:deep(.p-dataview-content) {
   background-color: transparent;
}

/* Pagination */
:deep(.p-paginator) {
   background-color: transparent;
}
:deep(.p-paginator-content) {
   color: white;
}
:deep(.p-dataview-paginator-bottom) {
   border: none;
}
:deep(.p-paginator-page.p-paginator-page-selected) {
   background-color: var(--color-secondary);
   color: white;
}
:deep(.p-paginator-last),
:deep(.p-paginator-first) {
   display: none !important; /* Disable go to first/last button */
}
/* Hover Effect */
:deep(.p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover),
:deep(.p-paginator-next:not(.p-disabled):hover),
:deep(.p-paginator-prev:not(.p-disabled):hover) {
   background-color: var(--color-secondary);
   color: white;
}
</style>
