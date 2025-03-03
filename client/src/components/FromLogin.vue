<script setup>
// **** IMPORTS ****

// *** Import Icons ***
import IconLock from './icons/IconLock.vue';
import IconCircleUserProfile from './icons/IconCircleUserProfile.vue';

// *** Import PrimeVue Components ***
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
</script>

<template>
   <div class="grid grid-cols-2">
      <div class="col-span-1">
         <form
            class="flex flex-col justify-center items-start gap-6 bg-white p-10 pr-13 pl-13 shadow-xl rounded-s-md"
         >
            <h1 class="text-3xl text-primary font-bold">Sign In</h1>
            <FloatLabel variant="on">
               <IconField>
                  <InputIcon>
                     <IconCircleUserProfile svg-width="21px" svg-color="#94a3b8" />
                  </InputIcon>
                  <InputText id="username-input" v-model="value3" autocomplete="off" />
               </IconField>
               <label for="username-input">Username</label>
            </FloatLabel>
            <FloatLabel variant="on">
               <IconField>
                  <InputIcon>
                     <IconLock svg-width="18px" svg-color="#94a3b8" />
                  </InputIcon>
                  <InputText id="password-input" v-model="value3" autocomplete="off" />
               </IconField>
               <label for="password-input">Password</label>
            </FloatLabel>
            <FloatLabel variant="on">
               <IconField>
                  <InputIcon>
                     <IconLock svg-width="18px" svg-color="#94a3b8" />
                  </InputIcon>
                  <InputText id="confirm-password-input" v-model="value3" autocomplete="off" />
               </IconField>
               <label for="confirm-password-input">Confirm password</label>
            </FloatLabel>
            <div class="inline-flex items-center">
               <Checkbox inputId="cheese" value="Cheese" />
               <label for="cheese" class="font-semibold pl-2 text-[#64748b]">Remember Me </label>
            </div>
            <Button type="submit" label="Submit" raised class="w-full hover:text-white mt-2" />
            <p class="text-[#64748b]">
               Don't have an account ?
               <span class="text-primary font-semibold">Sign Up</span>
            </p>
         </form>
      </div>
      <div
         class="left-section-background col-span-1 bg-primary flex justify-start items-end pb-5 pl-5 rounded-e-md"
      >
         <h2 class="text-2xl drop-shadow-2xl text-white font-semibold">Welcome Back !</h2>
      </div>
   </div>
</template>

<style scoped>
.left-section-background {
   background-image: url('@/assets/img/background-img-login.webp');
   background-size: 100% 100%;
}
</style>
