<script setup>
// *** Import Icons ***
import IconChat from './icons/IconChat.vue';
import IconFavoriteStar from './icons/IconFavoriteStar.vue';
import IconSliders from './icons/IconSliders.vue';
import IconTrophy from './icons/IconTrophy.vue';
</script>

<template>
   <div class="features-section-container">
      <h3 class="section-minor-title">FEATURES</h3>
      <h1 class="title">
         Multiple Features available to Chat, find Games and Challenge Yourself !
      </h1>
      <div class="features-content-wrapper">
         <div class="feature-content">
            <div class="icon-wrapper">
               <IconChat svg-width="35" svg-color="#FFFFFF" />
            </div>
            <p>Add friends, chat with them and discover common interests in video games.</p>
         </div>
         <div class="feature-content">
            <div class="icon-wrapper">
               <IconTrophy svg-width="35" svg-color="#FFFFFF" />
            </div>
            <p>Display your ranks or achievments on all your favorite competitive games.</p>
         </div>
         <div class="feature-content">
            <div class="icon-wrapper">
               <IconSliders svg-width="35" svg-color="#FFFFFF" />
            </div>
            <p>Customize your account to reflect your tastes in video games.</p>
         </div>
         <div class="feature-content">
            <div class="icon-wrapper">
               <IconFavoriteStar svg-width="35" svg-color="#FFFFFF" />
            </div>
            <p>Add games to your favorites and get new one recommended to you.</p>
         </div>
      </div>
   </div>
</template>

<style scoped>
.features-section-container {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background-color: var(--secondary-bg-color);
   padding-right: 4.5rem;
   padding-left: 4.5rem;
   width: 100%;
   height: 45vh;
   /* --- Represent first title in the feature section --- */
   > .section-minor-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-color);
   }
   > .title {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 6rem;
   }
   > .features-content-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      > .feature-content {
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         align-items: center;
         gap: 1rem;
         font-size: 1rem;
         font-weight: 600;
         > .icon-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 55px;
            height: 55px;
            border-radius: 30px;
            background-color: var(--primary-color);
            box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
         }
         > p {
            text-align: center;
            padding-right: 2rem;
            padding-left: 2rem;
         }
      }
   }
}
</style>
