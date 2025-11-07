import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/components/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue';
import { useAuthStore } from '@/stores/auth';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component:DashboardView,
      meta: { requiresAuth: true },
    }
   
  ],
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // 1. Zkontrolujeme, zda stránka vyžaduje autentizaci
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Pokud je vyžadována auth, ale uživatel není přihlášen,
    // přesměrujeme ho na /login
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && authStore.isLoggedIn) {
    // Pokud je uživatel přihlášen, ale pokouší se jít na /login nebo /register,
    // přesměrujeme ho na /dashboard
    next({ name: 'dashboard' });
  } else {
    // Jinak povolíme navigaci
    next();
  }
});

export default router
