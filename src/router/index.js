import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/main/HomePage.vue';
import LoginPage from '@/pages/login/LoginPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
