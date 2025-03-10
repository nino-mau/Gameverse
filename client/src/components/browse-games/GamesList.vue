<script setup>
const gameListRows = [
   [
      {
         id: 1,
         name: 'test',
         img: '',
      },
      {
         id: 2,
         name: 'test1',
         img: '',
      },
      {
         id: 3,
         name: 'test2',
         img: '',
      },
   ],
   [
      {
         id: 4,
         name: 'test3',
         img: '',
      },
      {
         id: 5,
         name: 'test4',
         img: '',
      },
      {
         id: 6,
         name: 'test5',
         img: '',
      },
   ],
];
</script>

<template>
   <div class="flex flex-col items-center justify-center gap-10">
      <template v-for="row in gameListRows" :key="gameListRows.indexOf(row)">
         <div
            class="grid max-h-[350px] w-[80%] grid-cols-3 place-content-center place-items-center"
         >
            <div class="col-span-1 h-[250px] w-[350px]">
               <div class="h-[70%]">
                  <img
                     class="rounded-t-xl object-cover"
                     src="https://images.igdb.com/igdb/image/upload/t_1080p/ar5bh.jpg"
                  />
               </div>
               <div class="bg-card-bg h-[30%] rounded-b-xl">
                  <h1>{{ row[0].name }}</h1>
               </div>
            </div>
            <div class="col-span-1 h-[250px] w-[350px]">
               <div class="h-[70%]">
                  <img
                     class="rounded-t-xl object-cover"
                     src="https://images.igdb.com/igdb/image/upload/t_1080p/ar21ru.jpg"
                  />
               </div>
               <div class="bg-card-bg h-[30%] rounded-b-xl">
                  <h1>{{ row[1].name }}</h1>
               </div>
            </div>
            <div class="col-span-1 h-[250px] w-[350px]">
               <div class="h-[70%]">
                  <img
                     class="rounded-t-xl object-cover"
                     src="https://images.igdb.com/igdb/image/upload/t_1080p/ar744.jpg"
                  />
               </div>
               <div class="bg-card-bg h-[30%] rounded-b-xl">
                  <h1>{{ row[2].name }}</h1>
               </div>
            </div>
         </div>
      </template>
   </div>
</template>

<style scoped></style>
