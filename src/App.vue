<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();
async function logoutUser() {
  
   await authStore.signOut();
  // Přesměrování na domovskou stránku nebo jinou stránku po odhlášení
   router.push('/login'); 
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
       
      

    </div>
        
       
  </header>
  <HelloWorld/>
  

 <div class="sidebar" v-if="authStore.isLoggedIn" >


    
    <button    @click="logoutUser()" >Log off</button > 
  </div>

  <RouterView />
 
  
  
<footer> <a href="https://www.flaticon.com/free-icons/lock" title="lock icons">Lock icons created by Pixel perfect - Flaticon</a></footer>
</template>

<style scoped>
.sidebar{
  position: fixed;
  height: 100%;
  width:15%;
  top:0;
  left: 0;
}
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
   font-size: 1.5rem;
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



  header .wrapper {
    display: flex;
    place-items: flex-end;
    flex-wrap: wrap;
  }
  
  nav {
    text-align: left;
    
   

    padding: 1rem 0;
    
  }
}

</style>
 