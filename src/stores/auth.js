// stores/auth.js (Pinia Store)
import { defineStore } from 'pinia';
import { ref,computed } from 'vue';
import { useSupabase } from '@/utils/supabase'; 

// ZAVOLÁNÍ composable pro získání supabase klienta

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value); // Reaktivní stav
  const { supabase } = useSupabase();

  // Aktualizuje stav uživatele na základě Supabase session

   const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null;
  });


  async function loadUser() {
    const { data: { session } } = await supabase.auth.getSession();
    user.value = session ? session.user : null;
  }

  // Funkce, která se zavolá po úspěšném přihlášení
  function setUser(userData) {
    user.value = userData;
  }

  // Přihlašovací funkce pro volání z LoginView
  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data.user) {
      setUser(data.user);
    }
    return { data, error };
  }


  async function signOut() {
    // 1. Zavolání metody odhlášení Supabase
    await supabase.auth.signOut();
    
    
        // 2. Resetování lokálního stavu uživatele
        user.value = null;
        // 3. Můžete zde přidat logiku pro navigaci (např. přesměrování na /login)
    
    
  }

  return { user, isLoggedIn, loadUser, setUser, signIn,signOut };
});

