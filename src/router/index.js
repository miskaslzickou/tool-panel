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
    
      meta: { requiresAuth: true },
      children: [
        {
          path: 'home',
          name: 'home dashboard',
          component: DashboardView,
          meta: { requiresAuth: true },
        },
        {
          path: 'crypto',
          name: 'crypto',
          // 💡 Zde je oprava - odkomentování dynamického importu komponenty
          component: () => import('@/views/CryptoView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'car-checker',
          name: 'car-checker',
          // 💡 Zde je oprava
          component: () => import('@/views/CarCheckerView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'weather',
          name: 'weather',
          // 💡 Zde je oprava
          component: () => import('@/views/WeatherView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'stocks',
          name: 'stocks',
          // 💡 Zde je oprava
          component: () => import('@/views/StocksView.vue'),
          meta: { requiresAuth: true },
        },
      ]
    
    }
   
  ],
})
router.beforeEach(async (to, from, next) => {
  const authStore =await useAuthStore();

  // 1. Zkontrolujeme, zda stránka vyžaduje autentizaci
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Pokud je vyžadována auth, ale uživatel není přihlášen,
    // přesměrujeme ho na /login
 
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && authStore.isLoggedIn) {
    // Pokud je uživatel přihlášen, ale pokouší se jít na /login nebo /register,
    // přesměrujeme ho na /dashboard
    next({ name: 'dashboard/home' });
    
  } else {
    // Jinak povolíme navigaci
   
    next();
  }
});

export default router
