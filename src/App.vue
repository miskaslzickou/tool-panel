<script setup>
import { RouterLink, RouterView } from 'vue-router'


import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted } from 'vue';
const authStore = useAuthStore();
const router = useRouter();
async function logoutUser() {
  
   await authStore.signOut();
  // Přesměrování na domovskou stránku nebo jinou stránku po odhlášení
   router.push('/login'); 



}



 



</script>
<template>
  <div class="app-container">
    <header v-show="!authStore.isLoggedIn">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </header>

    <main>
      <aside class="sidebar" v-if="authStore.isLoggedIn">
        <RouterLink to="/dashboard/home"><font-awesome-icon icon="fa-solid fa-house" ></font-awesome-icon> Home</RouterLink>
        <RouterLink to="/dashboard/crypto"><font-awesome-icon icon="fa-solid fa-bitcoin-sign" ></font-awesome-icon>Crypto</RouterLink>
        <RouterLink to="/dashboard/car-checker"><font-awesome-icon icon="fa-solid fa-car" ></font-awesome-icon> Car Checker</RouterLink>
        <router-link to="/dashboard/stocks"><font-awesome-icon icon="fa-solid fa-arrow-trend-up" ></font-awesome-icon> Stocks</router-link>
        <RouterLink to="/dashboard/weather"><font-awesome-icon icon="fa-solid fa-cloud-sun" ></font-awesome-icon> Weather</RouterLink>
        <button @click="logoutUser()">Log out <font-awesome-icon icon="fa-solid fa-right-from-bracket" /></button>
      </aside>

      <div class="main-content">
        <RouterView />
      </div>
    </main>

    <footer>
      <a href="https://www.flaticon.com/free-icons/lock" title="lock icons">
        Lock icons created by Pixel perfect - Flaticon
      </a>
    </footer>
  </div>
</template>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  
  max-width: 100vw;
  overflow-x: hidden;
  position: relative; /* Přidáno */
}

header {
  padding: 0.5rem 2rem; 

  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background);
  position: fixed; /* Přidáno */
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
   
  display: flex;
  justify-content: center;

}

main {
  display: flex;
  flex: 1;
  margin-top: 50px; /* Přidáno - kompenzace fixního header */
  padding: 0;
  width: 100%;
}

.sidebar {

  width: 150px;
  padding: 1rem;
  background-color: var(--color-background-soft);
  border-right: 1px solid var(--color-border);
  position: fixed;
  left: 0;
  top: 0; /* Změněno z 60px na 50px */
  bottom: 0;
  flex-direction: column;
  display: flex;
  
  justify-content: flex-start;
  gap: 1rem;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  padding: 2rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1200px; /* Add max-width for better readability */
}

/* Adjust margin only when sidebar is present */
.sidebar + .main-content {
  margin-left: 200px;
  margin-right: 0;
  width: calc(100% - 200px);
}

button {
  width: 100%;
  padding: 0.8rem;
  color: white;
  background-color: hsla(160, 100%, 37%, 1);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

button:hover {
  background-color: hsla(160, 100%, 42%, 1);
}

footer {
  padding: 1rem;
  text-align: center;
  border-top: 1px solid var(--color-border);
}

footer a {
  color: var(--color-text);
  font-size: 0.9rem;
  text-decoration: none;
}
nav {
  display: flex;
  gap: 2rem;
 
}

nav a{
  color: var(--color-text);
  font-size: 1.5rem;
  text-decoration: none;
}

.sidebar a{
  color: var(--color-text);
  
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

nav a.router-link-active, .sidebar a.router-link-active {
  color: hsla(160, 100%, 37%, 1);
}


.sidebar a:first-of-type {
  margin-top: 5rem;
}
.sidebar a:last-of-type {

  margin-bottom: auto;
}
@media (max-width: 768px) {
  .sidebar {
    width: 100px;
  }

  .sidebar + .main-content {
    margin-left: 100px;
    width: calc(100% - 100px);
  }
}

</style>
