// vue
import { createRouter, createWebHistory } from 'vue-router';

// pages/components
import TestPage from '@/views/TestPage.vue';
import LandingPage from '@/views/LandingPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import BrowseGames from '@/views/BrowseGames.vue';
import ContactPage from '@/views/ContactPage.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import DashboardProfileSettings from '@/components/main/DashboardProfileSettings.vue';
import DashboardProfileGames from '@/components/main/DashboardProfileGames.vue';
import DashboardProfileFriends from '@/components/main/DashboardProfileFriends.vue';

// init routes
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
         path: '/test',
         component: TestPage,
         name: 'test',
         meta: {
            componentName: 'TestPage',
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
               name: 'Settings',
            },
            {
               path: 'profileGames',
               component: DashboardProfileGames,
               name: 'Games',
            },
            {
               path: 'profileFriends',
               component: DashboardProfileFriends,
               name: 'Friends',
            },
         ],
      },
      {
         path: '/contact',
         component: ContactPage,
         name: 'contact',
         meta: {
            componentName: 'ContactPage',
            requiresAuth: false,
         },
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
