<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
async function logoutUser() {
  
    authStore.signOut();
  // Přesměrování na domovskou stránku nebo jinou stránku po odhlášení
  window.location.href = '/login';
}
// Načtení instance Storu


</script>

<template>
  <header>
   

    <div class="wrapper"> 
      <nav>
        <RouterLink to="/"> Home</RouterLink>
        <RouterLink to="/login"> Login</RouterLink>
       
         
      </nav>
       
      <HelloWorld/>

    </div>
        <button v-if="authStore.isLoggedIn" @click="logoutUser()" >Log off</button > 
       
  </header>

  <RouterView />

<footer> <a href="https://www.flaticon.com/free-icons/lock" title="lock icons">Lock icons created by Pixel perfect - Flaticon</a></footer>
</template>

<style scoped>
 footer {
   
    width: 100%;
    
    margin: 0;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
}
button{
  color: var(--color-text);
  font-size: 1.1rem;
}
button:hover{
  color: var(--color-border);
}

header {
  line-height: 1.5;
  
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
   font-size: 3rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-end;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
   

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

</style>
 