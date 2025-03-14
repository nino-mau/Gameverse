import { createRouter, createWebHistory } from 'vue-router';

// *** Import View Components ***
import LandingPage from '@/views/LandingPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import BrowseGames from '@/views/BrowseGames.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import DashboardProfileSettings from '@/components/main/DashboardProfileSettings.vue';
import DashboardProfileGames from '@/components/main/DashboardProfileGames.vue';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         component: LandingPage,
         name: 'landing',
         meta: {
            componentName: 'landingView',
            requiresAuth: false,
         },
      },
      {
         path: '/browse',
         component: BrowseGames,
         name: 'browse',
         meta: {
            componentName: 'BrowseGames',
            requiresAuth: false,
         },
      },
      {
         path: '/dashboard',
         component: DashboardPage,
         name: 'dashboard',
         meta: {
            componentName: 'DashboardPage',
            requiresAuth: false,
         },
         children: [
            {
               path: 'profileSettings',
               component: DashboardProfileSettings,
               name: 'dashboardProfileSettings',
            },
            {
               path: 'profileGames',
               component: DashboardProfileGames,
               name: 'dashboardProfileGames',
            },
         ],
      },
      {
         path: '/login',
         component: LoginPage,
         name: 'login',
         meta: {
            componentName: 'LoginPage',
            requiresAuth: false,
         },
      },
      {
         path: '/register',
         component: RegisterPage,
         name: 'register',
         meta: {
            componentName: 'RegisterPage',
            requiresAuth: false,
         },
      },
   ],
});

export default router;
