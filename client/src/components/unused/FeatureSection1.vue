<script setup>
// *** Import Icons ***
import IconChat from '../icons/IconChat.vue';
import IconFavoriteStar from '../icons/IconSettingsWheel.vue';
import IconSliders from '../icons/IconSliders.vue';
import IconTrophy from '../icons/IconMedal.vue';
</script>

<template>
   <div class="lp2-container">
      <h3 class="section-minor-title text-xl font-bold">FEATURES</h3>
      <h1 class="title text-3xl font-bold mt-4">
         Multiple Features available to Chat, find Games and Challenge Yourself !
      </h1>
      <div class="features-content-wrapper">
         <div class="feature-content font-semibold text-base">
            <div class="icon-wrapper mb-2">
               <IconChat svg-width="35" svg-color="#FFFFFF" />
            </div>
            <p>Add friends, chat with them and discover common interests in video games.</p>
         </div>
         <div class="feature-content font-semibold text-base">
            <div class="icon-wrapper mb-2">
               <IconTrophy svg-width="35" svg-color="#FFFFFF" />
            </div>
            <p>Display your ranks or achievments on all your favorite competitive games.</p>
         </div>
         <div class="feature-content font-semibold text-base">
            <div class="icon-wrapper mb-2">
               <IconSliders svg-width="35" svg-color="#FFFFFF" />
            </div>
            <p>Customize your account to reflect your tastes in video games.</p>
         </div>
         <div class="feature-content font-semibold text-base">
            <div class="icon-wrapper mb-2">
               <IconFavoriteStar svg-width="35" svg-color="#FFFFFF" />
            </div>
            <p>Add games to your favorites and get new one recommended to you.</p>
         </div>
      </div>
   </div>
</template>

<style scoped>
.lp2-container {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding-right: 4.5rem;
   padding-left: 4.5rem;
   /* --- Represent first title in the feature section --- */
   > .section-minor-title {
      color: var(--primary-color);
   }
   > .title {
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
