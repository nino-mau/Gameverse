<script setup>
// **** IMPORTS ****
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

// Import Functions
import { postData } from '@/utils/api.js';

// Import Libs/frameworks
import { z } from 'zod';
import { Form } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { useUserAuthStore } from '@/stores/authStore.js';
import { zodResolver } from '@primevue/forms/resolvers/zod';

// Import Icons
import IconLock from '@/components/icons/IconLock.vue';
import IconEmail from '@/components/icons/IconEmail.vue';
import IconCircleUserProfile from '@/components/icons/IconCircleUserProfile.vue';

// Import PrimeVue Components
import Button from 'primevue/button';
import Message from 'primevue/message';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FloatLabel from 'primevue/floatlabel';

// **** INIT ****

const toast = useToast();
const router = useRouter();
const userStore = useUserAuthStore();
// Contains potential server errors
const serverErrors = reactive({
   usernameErr: null,
   usernameValue: null,
   emailErr: null,
   emailValue: null,
});

// **** FUNCTIONS ****

// Handle triggering erros events depending on errors received from server.
function registrationErrorHandling(errors) {
   if (errors.duplicate !== null && errors.syntax === null) {
      if (errors.duplicate.type === 'both') {
         serverErrors.usernameErr = errors.duplicate.errorUsername;
         serverErrors.usernameValue = errors.duplicate.usernameValue;
         serverErrors.emailErr = errors.duplicate.errorEmail;
         serverErrors.emailValue = errors.duplicate.emailValue;
      } else if (errors.duplicate.type === 'username') {
         serverErrors.usernameErr = errors.duplicate.errorUsername;
         serverErrors.usernameValue = errors.duplicate.usernameValue;
      } else {
         serverErrors.emailErr = errors.duplicate.errorEmail;
         serverErrors.emailValue = errors.duplicate.emailValue;
      }
   } else if (errors.syntax) {
      toast.add({
         severity: 'error',
         summary: 'Registration failed cause of a syntax error in the data you submitted',
         life: 6000,
      });
   }
}

// **** LOGIC ****

// *** Handle Form-Validation ***

// Define initial values for form input
const initialValues = ref({
   username: '',
   email: '',
   password: '',
   confirmPassword: '',
});

// Verify if string inputs are valid
const resolver = zodResolver(
   z
      .object({
         username: z
            .string()
            .min(1, { message: 'Username is required.' })
            .min(3, { message: 'Username longer than 3 characters.' }),
         email: z.string().email({ message: 'Invalid email address' }),
         password: z
            .string()
            .min(1, { message: 'Password is required.' })
            .min(5, { message: 'Minimum 5 characters.' }),
         confirmPassword: z.string().min(1, { message: 'Confirm your password.' }),
      })
      .superRefine((val, ctx) => {
         if (val.password !== val.confirmPassword) {
            ctx.addIssue({
               code: 'custom',
               message: 'Password does not match.',
               path: ['confirmPassword'],
            });
         }
      }),
);

// *** Handle Submit ***

const onFormSubmit = async (e) => {
   // e.originalEvent: Represents the native form submit event.
   // e.reset: A function that resets the form to its initial state.
   // e.valid: A boolean that indicates whether the form is valid or not.
   // e.values: An object containing the current values of all form fields.
   // e.states: Contains the current state of each form field, including validity status.
   // e.errors: An object that holds any validation errors for the invalid fields in the form.

   if (e.valid) {
      // Post register data to the register endpoint triggering register process
      try {
         const result = await postData('https://gameverse.local/api/users/register', e.values);

         console.log(result.status);
         // Handle failure and success
         if (result.status === 200) {
            // Set login status to true in pinia store
            userStore.isUserLoggedIn = true;

            // Redirect user to profile page
            router.push('/');

            console.log('REGISTER: ', result.message);
         } else if (result.status === 409) {
            console.log(result.error);
            registrationErrorHandling(result.error);
            console.log('REGISTER: ', result.error);
         } else {
            console.log('REGISTER: ', result.error);
         }
      } catch (error) {
         console.error('REGISTER: ', error);
         toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Registration failed due to unexpected error',
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
            ref="registerForm"
            :initialValues
            :resolver
            @submit="onFormSubmit"
            class="flex flex-col items-start justify-center rounded-s-md bg-white pt-10 pr-13 pb-5 pl-13 shadow-xl"
         >
            <h1 class="text-primary mb-[33px] text-3xl font-bold">Sign Up</h1>
            <FloatLabel variant="on" class="input-wrapper">
               <IconField>
                  <InputIcon>
                     <IconCircleUserProfile svg-width="21px" svg-color="#94a3b8" />
                  </InputIcon>
                  <InputText
                     name="username"
                     type="text"
                     id="register-username-input"
                     :class="{ 'p-invalid': $form.username?.value === serverErrors.usernameValue }"
                     autocomplete="off"
                     fluid
                  />
                  <label for="register-username-input">Username</label>
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
                  v-if="$form.username?.value === serverErrors.usernameValue"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="text-invalid min-h-[10px] text-[15px]"
                  >{{ serverErrors.usernameErr }}</Message
               >
            </FloatLabel>
            <FloatLabel variant="on" class="input-wrapper">
               <IconField>
                  <InputIcon>
                     <IconEmail svg-width="21px" svg-color="#94a3b8" />
                  </InputIcon>
                  <InputText
                     name="email"
                     type="email"
                     id="register-email-input"
                     :class="{ 'p-invalid': $form.email?.value === serverErrors.emailValue }"
                     autocomplete="off"
                     fluid
                  />
                  <label for="register-email-input">Email</label>
               </IconField>
               <Message
                  v-if="$form.email?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="text-invalid min-h-[10px] text-[15px]"
                  >{{ $form.email.error.message }}</Message
               >
               <Message
                  v-if="$form.email?.value === serverErrors?.emailValue"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="text-invalid min-h-[10px] text-[15px]"
                  >{{ serverErrors.emailErr }}</Message
               >
            </FloatLabel>
            <FloatLabel variant="on" class="input-wrapper">
               <IconField>
                  <InputIcon class="z-10">
                     <IconLock svg-width="18px" svg-color="#94a3b8" />
                  </InputIcon>
                  <Password
                     name="password"
                     id="register-password-input"
                     autocomplete="off"
                     inputClass="password-input-custom-spacing w-full"
                     toggleMask
                     fluid
                  />
                  <label for="register-password-input">Password</label>
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
            <FloatLabel variant="on" class="input-wrapper">
               <IconField>
                  <InputIcon class="z-10">
                     <IconLock svg-width="18px" svg-color="#94a3b8" />
                  </InputIcon>
                  <Password
                     name="confirmPassword"
                     id="register-confirm-password-input"
                     autocomplete="off"
                     inputClass="password-input-custom-spacing w-full"
                     toggleMask
                     fluid
                  />
                  <label for="register-confirm-password-input">Confirm password</label>
               </IconField>
               <Message
                  v-if="$form.confirmPassword?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="text-invalid min-h-[10px] text-[15px]"
                  >{{ $form.confirmPassword.error.message }}</Message
               >
            </FloatLabel>
            <Button type="submit" label="Sign-up" raised class="mt-5 w-full hover:text-white" />
            <p class="mt-2 text-[#64748b]">
               Already have an account ?
               <span class="text-primary font-semibold">Sign In</span>
            </p>
         </Form>
      </div>
      <div
         class="left-section-background bg-primary col-span-1 flex items-end justify-start rounded-e-md pb-5 pl-5"
      >
         <h2 class="text-3xl font-semibold text-white drop-shadow-2xl">
            Tanks for your interest !
         </h2>
      </div>
   </div>
</template>

<style scoped>
.input-wrapper {
   display: flex;
   flex-direction: column;
   min-height: 75px;
}
.left-section-background {
   background-image: url('@/assets/img/background-img-login.webp');
   background-size: 100% 100%;
}
</style>
