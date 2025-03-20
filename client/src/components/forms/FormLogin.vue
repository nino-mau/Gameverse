<script setup>
// **** IMPORTS ****
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// *** Import Functions ***
import { postData } from '@/utils/api.js';

// *** Import Libs/Frameworks ***
import { z } from 'zod';
import { Form } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { useUserStore } from '@/stores/userStore.js';
import { zodResolver } from '@primevue/forms/resolvers/zod';

// *** Import Icons ***
import IconLock from '@/components/icons/IconLock.vue';
import IconCircleUserProfile from '@/components/icons/IconCircleUserProfile.vue';

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
const userStore = useUserStore();
// Store bool of the stay signed in checkbox
const staySignedInValue = ref();

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
         if (staySignedInValue.value === undefined) {
            staySignedInValue.value = false;
         }

         const data = {
            username: e.values.username,
            password: e.values.password,
            staySignedIn: staySignedInValue.value,
         };
         const result = await postData('https://gameverse.local/api/auth/login', data);

         // Handle failure and success
         if (result.status === 200) {
            // Set login status to true in pinia store
            userStore.isUserLoggedIn = true;

            // Redirect user to profile page
            router.push('/');

            console.log('LOGIN: ', result.message);
         } else if (result.status === 401) {
            serverError.value = result.error;
            console.error('LOGIN: ', result.error);
         } else {
            console.error('LOGIN: ', result.error);
            toast.add({
               severity: 'error',
               summary: 'Error',
               detail: 'Loging in failed due to unexpected error',
               life: 3000,
            });
         }
      } catch (error) {
         console.error('Unexpected error loging in user:', error);
         toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Loging in failed due to unexpected error',
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
            <FloatLabel variant="on">
               <IconField>
                  <InputIcon class="z-10">
                     <IconLock svg-width="18px" svg-color="#94a3b8" />
                  </InputIcon>
                  <Password
                     name="password"
                     id="login-password-input"
                     :feedback="true"
                     autocomplete="off"
                     :inputClass="`password-input-custom-spacing w-full ${serverError ? 'p-invalid' : ''}`"
                     toggleMask
                     fluid
                  >
                  </Password>
                  <label for="login-password-input">Password</label>
               </IconField>
               <Message
                  v-if="$form.password?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="text-invalid text-[15px]"
                  >{{ $form.password.error.message }}</Message
               >
            </FloatLabel>
            <div class="mt-4 inline-flex items-center">
               <Checkbox
                  name="staySignedIn"
                  inputId="stay-signed-in-checkbox"
                  :binary="true"
                  v-model="staySignedInValue"
               />
               <label for="stay-signed-in-checkbox" class="pl-2 font-semibold text-[#64748b]"
                  >Stay signed in
               </label>
            </div>
            <Button type="submit" label="Sign-in" class="mt-9 w-full hover:text-white" raised />
            <p class="mt-2 text-[#64748b]">
               Don't have an account ?
               <span class="text-primary font-semibold">Sign Up</span>
            </p>
         </Form>
      </div>
      <div
         class="left-section-background bg-primary col-span-1 flex items-end justify-start rounded-e-md pb-5 pl-5"
      >
         <h2 class="text-3xl font-semibold text-white drop-shadow-2xl">Welcome back !</h2>
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
.p-password-input {
   border-color: var(--color-invalid) !important;
}
</style>
