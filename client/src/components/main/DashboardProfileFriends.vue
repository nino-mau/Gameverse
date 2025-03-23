<script setup>
// vue
import { ref, onMounted, computed } from 'vue';

// primevue
import { DataView, Select, Button } from 'primevue';
import Skeleton from 'primevue/skeleton';

// icons
import { CircleMinus, Check, X, Frown } from 'lucide-vue-next';
import CustomAvatar from '../icons/CustomAvatar.vue';

// functions
import { callApi } from '@/utils/api';
import { overideArray } from '@/utils/general';

// librairies
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// dependencies
import { useFriendsStore } from '@/stores/friendsStore';

// Init store and services
const friendsStore = useFriendsStore();

//***===== State =====***//

const userFriends = computed(() => friendsStore.friends);
const suggestedFriends = ref([]);
const userFriendRequests = ref([]);

//***===== Functions =====***//

// API calls wrapper

const getUserFriendRequests = async () => {
   const r = await friendsStore.getUserFriendRequests();
   overideArray(userFriendRequests, r.data);
};

const getSuggestedFriends = async () => {
   const options = {
      data: {},
      method: 'GET',
      credentials: 'include',
      caller: 'getSuggestedFriends',
      isProtected: true,
   };
   try {
      const r = await callApi('/users/friends/suggestions', options);

      suggestedFriends.value.splice(0, suggestedFriends.value.length, ...r.data); // Override with new received data
   } catch (err) {
      console.log('getSuggestedFriends: unexpected error:', err);
   }
};

const addSuggestedFriends = async (friendId) => {
   const r = await friendsStore.addFriend(friendId);

   if (r) {
      // Remove the friend from allUsersData so they no longer appear as a suggestion
      const filteredData = suggestedFriends.value.filter((user) => user.id !== friendId);
      overideArray(suggestedFriends, filteredData);

      toast('Sent friend request', {
         theme: 'colored',
         type: 'success',
         autoClose: 3000, // Close after 3 seconds
      });
   } else {
      toast('Failed to send friend request', {
         theme: 'colored',
         type: 'error',
         autoClose: 3000, // Close after 3 seconds
      });
   }
};

const acceptFriendRequest = async (friendId) => {
   const r = await friendsStore.acceptFriendRequest(friendId);

   if (r) {
      // Remove the friend from friends requests arr so they no longer appear
      const filteredData = userFriendRequests.value.filter(
         (item) => item.requester_id !== friendId,
      );
      overideArray(userFriendRequests, filteredData);

      toast('Accepted friend request', {
         theme: 'colored',
         type: 'success',
         autoClose: 3000, // Close after 3 seconds
      });
   } else {
      toast('Failed to accept friend request', {
         theme: 'colored',
         type: 'error',
         autoClose: 3000, // Close after 3 seconds
      });
   }
};

const deleteFriendRequest = async (friendId) => {
   const r = await friendsStore.deleteFriendRequest(friendId);

   if (r) {
      // Remove the friend from friends requests arr so they no longer appear
      const filteredData = userFriendRequests.value.filter(
         (item) => item.requester_id !== friendId,
      );
      overideArray(userFriendRequests, filteredData);
   } else {
      toast('Failed to delete friend request', {
         theme: 'colored',
         type: 'error',
         autoClose: 3000, // Close after 3 seconds
      });
   }
};

//***===== Lifecycle =====***//

onMounted(async () => {
   await friendsStore.getUserFriends(); // Update friends in store
   await getUserFriendRequests(); // Get requests sent to user
   await getSuggestedFriends(); // Get suggested friends
});
</script>

<template>
   <!-- Friends Page -->
   <div class="flex h-full w-full flex-row rounded-2xl">
      <!-- Features Section -->
      <div class="grid max-h-full w-[75%] grid-cols-13 grid-rows-2 gap-[1rem] pr-[1rem]">
         <!-- Friends Recommendations -->
         <div class="bg-bg2 col-span-7 row-span-1 flex flex-col rounded-xl p-[1.5rem]">
            <!-- If empty -->
            <template v-if="suggestedFriends.length === 0">
               <div class="row-span-4 m-auto flex flex-col items-center justify-center gap-5">
                  <CircleMinus size="45" color="var(--color-primary)" />
                  <h1 class="text-primary text-xl font-semibold">No available suggestions</h1>
               </div>
            </template>
            <!-- Main -->
            <template v-else>
               <!-- Header -->
               <div class="mb-[35px]">
                  <h3 class="mb-2 text-2xl font-bold">Suggestions</h3>
                  <p class="text-sm opacity-85">Your daily suggestion by our matchmaking</p>
               </div>
               <!-- Suggested Friends List -->
               <div class="suggested-friends-list grid flex-1 grid-rows-3" role="list">
                  <!-- Friend Item -->
                  <template v-if="!suggestedFriends">
                     <div v-for="i in 3" :key="i" class="col-span-1 mb-4 flex">
                        <Skeleton shape="square" size="5rem" class="mr-2 bg-transparent"></Skeleton>
                        <div class="grow">
                           <Skeleton class="mb-2 w-[90%] bg-transparent"></Skeleton>
                           <Skeleton class="mb-2 w-[70%] bg-transparent"></Skeleton>
                           <Skeleton class="mb-2 w-[70%] bg-transparent"></Skeleton>
                        </div>
                     </div>
                  </template>
                  <template v-else>
                     <div
                        v-for="item in suggestedFriends"
                        :key="item.id"
                        class="hover:bg-secondary row-span-1 flex flex-row items-center rounded-md p-3"
                     >
                        <CustomAvatar shape="square" custom-class="avatar " icon-size="2.5rem" />
                        <div class="ml-2 flex max-w-[11rem] flex-col">
                           <h3 class="text-xl font-semibold">{{ item.name }}</h3>
                           <p class="text-xs italic opacity-85">
                              "Veniam veniam ex incididunt reprehenderit"
                           </p>
                        </div>
                        <Button
                           class="border-primary bg-bg2 hover:bg-primary hover:text-bg2 text-primary ml-auto border-2 transition"
                           label="Add"
                           @click="addSuggestedFriends(item.id)"
                        >
                        </Button></div
                  ></template>
               </div>
            </template>
         </div>
         <!-- Friends Search -->
         <div class="bg-bg2 col-span-6 row-span-1 rounded-xl"></div>
         <!-- Friends Requests -->
         <div class="bg-bg2 col-span-13 row-span-1 flex flex-col rounded-xl p-[1.5rem]">
            <!-- If empty -->
            <template v-if="userFriendRequests.length === 0">
               <div class="m-auto flex flex-col items-center justify-center gap-4">
                  <h1 class="text-primary text-xl font-semibold">No Friends Requests</h1>
                  <Frown color="var(--color-primary)" size="35" />
               </div>
            </template>
            <!-- Main -->
            <template v-else>
               <!-- Header -->
               <div class="mb-[20px]">
                  <h3 class="mb-2 text-2xl font-bold">Pending Requests</h3>
               </div>
               <DataView :value="userFriendRequests" class="bg-transparent" paginator :rows="9">
                  <template #list="slotProps">
                     <div class="grid grid-cols-12 gap-2">
                        <div
                           v-for="(item, index) in slotProps.items"
                           :key="index"
                           class="col-span-4"
                        >
                           <div
                              class="hover:bg-secondary flex flex-row items-center justify-between gap-2 rounded-xl bg-transparent p-2.5 pr-3"
                              :key="item.requester_id"
                           >
                              <div class="flex flex-row items-center gap-2">
                                 <CustomAvatar
                                    customClass="w-[3rem] h-[3rem] no-dropshadow"
                                    shape="square"
                                    icon-size="1.9rem"
                                 />
                                 <h4 class="font-semibold text-white">
                                    {{ item.requester_name }}
                                 </h4>
                              </div>
                              <div class="flex flex-row gap-2">
                                 <Button
                                    class="hover:text-bg2 text-bg2 h-[30%] p-1 text-sm font-semibold"
                                    @click="acceptFriendRequest(item.requester_id)"
                                 >
                                    <Check size="20" />
                                 </Button>
                                 <Button
                                    variant="outlined"
                                    class="hover:bg-primary hover:text-bg2 h-[30%] p-1 text-sm font-semibold"
                                    @click="deleteFriendRequest(item.requester_id)"
                                 >
                                    <X size="20" />
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </template>
               </DataView>
            </template>
         </div>
      </div>
      <!-- Friends List Section -->
      <div class="h-full w-[25%]">
         <div class="bg-bg2 flex h-full w-full flex-col justify-start rounded-xl p-[1.5rem]">
            <!-- Header -->
            <div class="mb-[35px]">
               <h3 class="mb-2 text-2xl font-bold">Friends</h3>
               <p class="text-sm opacity-85">Start New Conversation</p>
            </div>
            <!-- List -->
            <DataView
               :value="userFriends"
               paginator
               :rows="8"
               :sortOrder="sortOrder"
               :sortField="sortField"
               class="bg-transparent"
            >
               <!-- If empty section -->
               <template #empty>
                  <div class="flex flex-col items-center justify-center gap-4">
                     <h1 class="text-primary text-xl font-semibold">No Friends were found</h1>
                     <Frown color="var(--color-primary)" size="35" />
                  </div>
               </template>

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
                        <Transition name="bounce-in">
                           <div
                              class="hover:bg-secondary flex flex-col gap-2 rounded-4xl bg-transparent p-2 pl-1 sm:flex-row sm:items-center"
                              :key="item.user_id"
                           >
                              <!-- Avatar -->
                              <CustomAvatar
                                 customClass="w-[3rem] h-[3rem] no-dropshadow"
                                 shape="circle"
                                 icon-size="1.9rem"
                              />
                              <div>
                                 <!-- Name -->
                                 <h4 class="font-semibold text-white">{{ item.user_name }}</h4>
                                 <!-- Status -->
                                 <p class="text-primary text-sm">Online</p>
                              </div>
                           </div>
                        </Transition>
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
