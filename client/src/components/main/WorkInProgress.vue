<script setup>
import { Button } from 'primevue';
</script>

<template>
   <div class="bg-bg3 border-primary w-full max-w-md rounded-lg p-6 text-center">
      <div class="mb-4 flex justify-center">
         <div class="rounded-full bg-yellow-100 p-3">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               class="w-20 text-yellow-500"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
               />
            </svg>
         </div>
      </div>

      <h2 class="mb-3 text-2xl font-bold text-gray-800">This Page Is <br />Under Development</h2>

      <!-- Added content below -->
      <p class="mb-4 text-gray-600">Check back later to see changes.</p>

      <div class="mb-5 flex justify-center">
         <div class="h-2 w-48 rounded-full bg-gray-200">
            <div class="h-2 w-24 rounded-full bg-yellow-500"></div>
         </div>
      </div>

      <p class="text-sm text-gray-500">Estimated completion: Coming Soon</p>

      <Button label="Go Home" class="mt-6 px-4 py-2 text-white" />
   </div>
</template>
