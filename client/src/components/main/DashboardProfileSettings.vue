<script setup>
/*==============================
===========  IMPORTS  ==========
===============================*/

// libs
import { useUserStore } from '@/stores/userStore.js';

// primevue
import { Avatar } from 'primevue';
import FileUpload from 'primevue/fileupload';

// icons
import IconCircleUserProfile from '../icons/IconCircleUserProfile.vue';

/*==============================
============  MAIN  ============
===============================*/

const userStore = useUserStore(); // Setup user auth store
</script>

<template>
   <div class="bg-bg2 flex h-full w-full flex-col rounded-2xl p-10">
      <!-- **** Avatar section ***** -->
      <h1 class="mb-2 text-xl font-semibold opacity-75">Profile picture</h1>
      <hr />
      <div class="mt-5 mb-5 flex flex-row items-center">
         <Avatar
            icon="pi pi-user"
            class="mr-0.5 ml-0.5 h-[4rem] w-[4rem] shadow-xl"
            size="large"
            shape="circle"
         >
            <IconCircleUserProfile
               svg-class="hover-effect-svg-stroke"
               svg-color="var(--color-secondary)"
               svg-width="2.5rem"
            />
         </Avatar>
         <div class="ml-2 flex flex-col">
            <h1 class="text-xl font-extrabold">@{{ userStore.userData.username }}</h1>
            <h1 class="text-xl italic">{{ userStore.userData.email }}</h1>
         </div>
         <FileUpload
            mode="basic"
            name="profilePicture"
            url="/api/users/profile-picture"
            accept="image/*"
            :maxFileSize="1000000"
            @upload="onUpload"
            :auto="true"
            chooseLabel="Edit profile picture"
            class="hover:text-bg2 active:bg-btn-active bg-bg2 ml-20 w-[15rem] border-2 border-white text-white hover:bg-white"
            variant="outlined"
            raised
         />
         <small v-if="errorMessage" class="error-message">{{ errorMessage }}</small>
      </div>
   </div>
</template>

<style scoped></style>
