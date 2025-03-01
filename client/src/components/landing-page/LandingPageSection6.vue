<script setup>
// *** Import PrimeVue Components ***
import Card from 'primevue/card';

// *** Import Icons ***
import IconChat from '../icons/IconChat.vue';
import IconSettingsWheel from '../icons/IconSettingsWheel.vue';
import IconMedal from '../icons/IconMedal.vue';
</script>

<template>
   <div class="lp6-container w-full h-[50vh] flex flex-row justify-center items-center gap-[5rem]">
      <Card
         class="w-[21rem] h-[14.5rem] overflow-hidden bg-[#5078a4] flex flex-col justify-center items-center"
      >
         <template #header>
            <div
               class="w-[60px] h-[60px] rounded-full border-2 border-white flex justify-center items-center mt-5"
            >
               <IconChat svg-width="39" svg-color="#ffffff" />
            </div>
         </template>
         <template #title
            ><h1 class="text-2xl font-bold text-white text-center">Social</h1></template
         >
         <template #content>
            <p class="m-0 text-white text-center pr-5 pl-5 mt-2">
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
         </template>
      </Card>
      <Card
         class="w-[21rem] h-[14.5rem] overflow-hidden bg-[#a45078] flex flex-col justify-center items-center"
      >
         <template #header>
            <div
               class="w-[60px] h-[60px] rounded-full border-2 border-white flex justify-center items-center mt-5"
            >
               <IconMedal svg-width="39" svg-color="#ffffff" />
            </div>
         </template>
         <template #title
            ><h1 class="text-2xl font-bold text-white text-center">Ranking</h1></template
         >
         <template #content>
            <p class="m-0 text-white text-center pr-5 pl-5 mt-2">
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
         </template>
      </Card>
      <Card
         class="w-[21rem] h-[14.5rem] overflow-hidden bg-[#7c50a4] flex flex-col justify-center items-center"
      >
         <template #header>
            <div
               class="w-[60px] h-[60px] rounded-full border-2 border-white flex justify-center items-center mt-5"
            >
               <IconSettingsWheel svg-width="39" svg-color="#ffffff" />
            </div>
         </template>
         <template #title
            ><h1 class="text-2xl font-bold text-white text-center">Customization</h1></template
         >
         <template #content>
            <p class="m-0 text-white text-center pr-5 pl-5 mt-2">
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
         </template>
      </Card>
   </div>
</template>

<style scoped></style>
