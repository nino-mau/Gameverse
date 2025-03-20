<script setup>
// vue
import { ref } from 'vue';

// primevue
import { DataView, Select, Button } from 'primevue';

// icons
import { SquarePlus, X, Plus } from 'lucide-vue-next';
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
      <!-- Features -->
      <div class="grid h-full w-[75%] grid-cols-13 grid-rows-5 gap-[1rem] pr-[1rem]">
         <!-- Friends Recommendations -->
         <div class="bg-bg2 col-span-6 row-span-3 flex flex-col rounded-xl p-[1.5rem]">
            <!-- Header -->
            <div class="mb-[35px]">
               <h3 class="mb-2 text-2xl font-bold">Suggestions</h3>
               <p class="text-sm opacity-85">Your daily suggestion by our matchmaking</p>
            </div>
            <!-- Suggested Friends List -->
            <div class="suggested-friends-list grid flex-1 grid-rows-4" role="list">
               <div class="hover:bg-secondary row-span-1 flex flex-row items-center rounded-md p-3">
                  <CustomAvatar shape="square" custom-class="avatar " icon-size="2.5rem" />
                  <div class="ml-2 flex max-w-[11rem] flex-col">
                     <h3 class="text-xl font-semibold">Username</h3>
                     <p class="text-xs italic opacity-85">
                        "Veniam veniam ex incididunt reprehenderit"
                     </p>
                  </div>
                  <Button
                     class="hover:text-secondary ml-auto h-[100%] border-white text-white hover:bg-white"
                     variant="outlined"
                  >
                     <Plus size="20px" />
                  </Button>
               </div>
               <div class="hover:bg-secondary row-span-1 flex flex-row items-center rounded-md p-3">
                  <CustomAvatar shape="square" custom-class="avatar " icon-size="2.5rem" />
                  <div class="ml-2 flex max-w-[11rem] flex-col">
                     <h3 class="text-xl font-semibold">Username</h3>
                     <p class="text-xs italic opacity-85">
                        "Veniam veniam ex incididunt reprehenderit"
                     </p>
                  </div>
                  <Button
                     class="hover:text-secondary ml-auto h-[100%] border-white text-white hover:bg-white"
                     variant="outlined"
                  >
                     <Plus size="20px" />
                  </Button>
               </div>
               <div class="hover:bg-secondary row-span-1 flex flex-row items-center rounded-md p-3">
                  <CustomAvatar shape="square" custom-class="avatar " icon-size="2.5rem" />
                  <div class="ml-2 flex max-w-[11rem] flex-col">
                     <h3 class="text-xl font-semibold">Username</h3>
                     <p class="text-xs italic opacity-85">
                        "Veniam veniam ex incididunt reprehenderit"
                     </p>
                  </div>
                  <Button
                     class="hover:text-secondary ml-auto h-[100%] border-white text-white hover:bg-white"
                     variant="outlined"
                  >
                     <Plus size="20px" />
                  </Button>
               </div>
               <div class="hover:bg-secondary row-span-1 flex flex-row items-center rounded-md p-3">
                  <CustomAvatar shape="square" custom-class="avatar " icon-size="2.5rem" />
                  <div class="ml-2 flex max-w-[11rem] flex-col">
                     <h3 class="text-xl font-semibold">Username</h3>
                     <p class="text-xs italic opacity-85">
                        "Veniam veniam ex incididunt reprehenderit"
                     </p>
                  </div>
                  <Button
                     class="hover:text-secondary ml-auto h-[100%] border-white text-white hover:bg-white"
                     variant="outlined"
                  >
                     <Plus size="20px" />
                  </Button>
               </div>
            </div>
         </div>
         <!-- Friends Search -->
         <div class="bg-bg2 col-span-7 row-span-3 rounded-xl"></div>
         <!-- Settings -->
         <div class="bg-bg2 col-span-13 row-span-2 rounded-xl"></div>
      </div>
      <!-- Friends List -->
      <div class="h-full w-[25%]">
         <div class="bg-bg2 flex h-full w-full flex-col justify-start rounded-xl p-[1.5rem]">
            <!-- Header -->
            <div class="mb-[35px]">
               <h3 class="mb-2 text-2xl font-bold">Friends</h3>
               <p class="text-sm opacity-85">Start New Conversation</p>
            </div>
            <!-- List -->
            <DataView
               :value="friendsData"
               paginator
               :rows="8"
               :sortOrder="sortOrder"
               :sortField="sortField"
               class="bg-transparent"
            >
               <template #header>
                  <!-- Filter Button -->
                  <Select
                     optionLabel="label"
                     placeholder="Sort By"
                     class="h-[34px] bg-transparent text-sm text-white"
                  />
               </template>

               <!-- Friend Item Container -->
               <template #list="slotProps">
                  <div class="flex flex-col gap-[.6rem]">
                     <div v-for="(item, index) in slotProps.items" :key="index">
                        <div
                           class="hover:bg-secondary flex flex-col gap-2 rounded-4xl bg-transparent p-2 pl-1 sm:flex-row sm:items-center"
                        >
                           <!-- Avatar -->
                           <CustomAvatar
                              customClass="w-[3rem] h-[3rem] no-dropshadow"
                              shape="circle"
                              icon-size="1.9rem"
                           />
                           <div>
                              <!-- Name -->
                              <h4 class="font-semibold text-white">{{ item.name }}</h4>
                              <!-- Status -->
                              <p class="text-primary text-sm">Online</p>
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
/* --- Custom DataView (Friend List) --- */

/* Friends list container */
:deep(.p-dataview-content) {
   background-color: transparent;
   margin-bottom: 1.5rem !important;
   margin-top: 1.3rem;
}
:deep(.p-dataview-header) {
   background-color: transparent;
   padding-left: 0;
   padding-top: 0;
}

/* Pagination */
:deep(.p-paginator) {
   background-color: transparent;
   padding-bottom: 0;
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

/* --- Styling for Suggested Friends section --- */

.suggested-friends-list {
   & .avatar {
      width: 4rem !important;
      height: 4rem !important;
   }
}

/* Used to remove drop-shadow from component */
.no-dropshadow {
   filter: drop-shadow(0);
}
</style>
