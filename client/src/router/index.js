import { createRouter, createWebHistory } from 'vue-router';

// *** Import View Components ***
import LandingPage from '@/views/LandingPage.vue';
import LoginPage from '@/views/LoginPage.vue';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      { path: '/', component: LandingPage },
      { path: '/login', component: LoginPage },
   ],
});

export default router;
