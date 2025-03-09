<script setup>
// **** IMPORTS ****
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// *** Import Functions ***
import { postData } from '@/assets/js/utils';

// *** Import Libs/Frameworks ***
import { z } from 'zod';
import { Form } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { useUserAuthStore } from '../stores/authStore.js';
import { zodResolver } from '@primevue/forms/resolvers/zod';

// *** Import Icons ***
import IconLock from './icons/IconLock.vue';
import IconCircleUserProfile from './icons/IconCircleUserProfile.vue';

// *** Import PrimeVue Components ***
import Button from 'primevue/button';
import Message from 'primevue/message';
import Checkbox from 'primevue/checkbox';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FloatLabel from 'primevue/floatlabel';

// **** INIT ****

const toast = useToast();
const router = useRouter();
const serverError = ref(null);
const userStore = useUserAuthStore();
// Store bool of the remember me checkbox
const rememberMeValue = ref();

// **** LOGIC ****

// *** Handle Form-Validation ***

// Define initial values for form input
const initialValues = ref({
   username: '',
   password: '',
});

// Verify if string inputs are valid
const resolver = zodResolver(
   z.object({
      username: z.string().min(1, { message: 'Username is required.' }),
      password: z.string().min(1, { message: 'Password is required.' }),
   }),
);

// *** Handle Submit Actions ***

const onFormSubmit = async (e) => {
   // e.originalEvent: Represents the native form submit event.
   // e.valid: A boolean that indicates whether the form is valid or not.
   // e.states: Contains the current state of each form field, including validity status.
   // e.errors: An object that holds any validation errors for the invalid fields in the form.
   // e.values: An object containing the current values of all form fields.
   // e.reset: A function that resets the form to its initial state.

   if (e.valid) {
      try {
         if (rememberMeValue.value === undefined) {
            rememberMeValue.value = false;
         }

         const data = {
            username: e.values.username,
            password: e.values.password,
            rememberMe: rememberMeValue.value,
         };
         const result = await postData('https://gameverse.local/api/users/login', data);

         if (result.status === 'success') {
            // Use user store function which store token in browser storage
            // userStore.setToken(result.data.token);
            userStore.isUserLoggedIn = true;

            // Redirect user to profile page
            router.push('/');

            console.log(result.message, result);
         } else if (result.status !== 500) {
            serverError.value = result.error;
            console.error(result.error, result.details);
         } else {
            console.error(result.error, result.details);
         }
      } catch (error) {
         console.error('Unexpected error loging in user:', error);
         toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Loging in failed cause of an unexpected error',
            life: 3000,
         });
      }
   }
};
</script>

<template>
   <div class="grid grid-cols-2">
      <div class="col-span-1">
         <Form
            v-slot="$form"
            :initialValues
            :resolver
            @submit="onFormSubmit"
            class="flex flex-col items-start justify-center rounded-s-md bg-white pt-12 pr-13 pb-6 pl-13 shadow-xl"
         >
            <h1 class="text-primary mb-[33px] text-3xl font-bold">Sign In</h1>
            <FloatLabel variant="on" class="input-wrapper">
               <IconField>
                  <InputIcon>
                     <IconCircleUserProfile svg-width="21px" svg-color="#94a3b8" />
                  </InputIcon>
                  <InputText
                     name="username"
                     id="login-username-input"
                     :class="{ 'p-invalid': serverError }"
                     type="text"
                     autocomplete="off"
                     fluid
                  />
                  <label for="login-username-input">Username</label>
               </IconField>
               <Message
                  v-if="$form.username?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="text-invalid min-h-[10px] text-[15px]"
                  >{{ $form.username.error.message }}</Message
               >
               <Message
                  v-if="serverError"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="text-invalid min-h-[10px] text-[15px]"
                  >{{ serverError }}</Message
               >
            </FloatLabel>
            <FloatLabel variant="on" class="input-wrapper">
               <IconField>
                  <InputIcon class="z-10">
                     <IconLock svg-width="18px" svg-color="#94a3b8" />
                  </InputIcon>
                  <Password
                     name="password"
                     id="login-password-input"
                     :feedback="true"
                     autocomplete="off"
                     inputClass="password-input-custom-spacing w-full"
                     toggleMask
                     fluid
                  />
                  <label for="login-password-input">Password</label>
               </IconField>
               <Message
                  v-if="$form.password?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="text-invalid min-h-[10px] text-[15px]"
                  >{{ $form.password.error.message }}</Message
               >
            </FloatLabel>
            <div class="inline-flex items-center">
               <Checkbox
                  name="rememberMe"
                  inputId="login-rememberme-checkbox"
                  :binary="true"
                  v-model="rememberMeValue"
               />
               <label for="login-rememberme-checkbox" class="pl-2 font-semibold text-[#64748b]"
                  >Remember Me
               </label>
            </div>
            <Button type="submit" label="Sign-in" class="mt-10 w-full hover:text-white" raised />
            <p class="mt-5 text-[#64748b]">
               Don't have an account ?
               <span class="text-primary font-semibold">Sign Up</span>
            </p>
         </Form>
      </div>
      <div
         class="left-section-background bg-primary col-span-1 flex items-end justify-start rounded-e-md pb-5 pl-5"
      >
         <h2 class="text-3xl font-semibold text-white drop-shadow-2xl">Welcome Back !</h2>
      </div>
   </div>
</template>

<style scoped>
.input-wrapper {
   display: flex;
   flex-direction: column;
   min-height: 80px;
}
.left-section-background {
   background-image: url('@/assets/img/background-img-login.webp');
   background-size: 100% 100%;
}
</style>
