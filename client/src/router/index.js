import { createRouter, createWebHistory } from 'vue-router';

// *** Import View Components ***
import LandingPage from '@/views/LandingPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import BrowseGames from '@/views/BrowseGames.vue';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      { path: '/', component: LandingPage },
      { path: '/browse', component: BrowseGames },
      { path: '/login', component: LoginPage },
      { path: '/register', component: RegisterPage },
   ],
});

export default router;
