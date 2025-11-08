// stores/auth.js (Pinia Store)
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useSupabase } from '@/utils/supabase';

// ZAVOLÁNÍ composable pro získání supabase klienta

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const accessToken = ref(null);
  const refreshToken = ref(null);
  const isLoggedIn = computed(() => !!user.value); // Reaktivní stav
  const { supabase } = useSupabase();

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null;
    accessToken.value = session?.access_token ?? null;
    refreshToken.value = session?.refresh_token ?? null;
    if (session) {
      saveSessionToStorage(session);
    } else {
      localStorage.removeItem('sbSession');
    }
  });

  function saveSessionToStorage(session) {
    try {
      const payload = {
        access_token: session?.access_token ?? null,
        refresh_token: session?.refresh_token ?? null,
        user: session?.user ?? null,
        expires_at: session?.expires_at ?? null
      };
      localStorage.setItem('sbSession', JSON.stringify(payload));
      accessToken.value = payload.access_token;
      refreshToken.value = payload.refresh_token;
      user.value = payload.user;
    } catch (e) {
      console.warn('Failed to save session to localStorage', e);
    }
  }

  async function restoreSessionFromStorage() {
    const raw = localStorage.getItem('sbSession');
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.access_token && parsed?.refresh_token) {
        // Pokusíme se obnovit session v Supabase klientu
        const { data, error } = await supabase.auth.setSession({
          access_token: parsed.access_token,
          refresh_token: parsed.refresh_token
        });
        if (!error && data?.session) {
          saveSessionToStorage(data.session);
          return true;
        } else {
          // pokud selže, smažeme uloženou session
          localStorage.removeItem('sbSession');
          return false;
        }
      }
    } catch (e) {
      localStorage.removeItem('sbSession');
      return false;
    }
    return false;
  }

  async function loadUser() {
    // Nejprve zkusíme získat aktuální session z klienta
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      saveSessionToStorage(session);
      return;
    }
    // Pokud žádná session, pokusíme se obnovit z localStorage
    await restoreSessionFromStorage();
  }

  // Funkce, která se zavolá po úspěšném přihlášení
  function setUser(userData) {
    user.value = userData;
  }

  // Přihlašovací funkce pro volání z LoginView
  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data?.session) {
      saveSessionToStorage(data.session);
    }
    if (data?.user) {
      setUser(data.user);
    }
    return { data, error };
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore - pokračujeme v čištění lokálního stavu
      console.warn('signOut error', e);
    }
    // Reset lokálního stavu
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem('sbSession');
  }

  return { user, isLoggedIn, loadUser, setUser, signIn, signOut, accessToken, refreshToken };
});

