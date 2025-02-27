<script setup>
// *** Import PrimeVue Components ***
import Button from 'primevue/button';
</script>

<template>
   <div class="lp5-container h-[100vh] w-full flex justify-center items-center">
      <div
         class="cta-container w-[920px] h-[315px] border-[2.5px] border-white rounded-md grid grid-cols-5"
      >
         <div class="text-section col-span-3 flex flex-col justify-center pl-[4rem]">
            <h3 class="text-3xl/[1.6] font-bold">
               Sign up or Login to start using our <span class="text-primary">Features !</span>
            </h3>
            <p>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
               incididunt ut labore et dolore
            </p>
            <Button
               class="w-[240px] h-[55px] text-secondary font-semibold hover:text-secondary mt-3"
               label="Sign-up"
               raised
            />
         </div>
         <div class="img-section flex justify-center items-end col-span-2 pr-[1.5rem]">
            <img src="@/assets/img/gameCharacterIllustration.webp" />
         </div>
      </div>
   </div>
</template>

<style scoped></style>
