
<script setup>
import {useSupabase} from '../utils/supabase.js';
import { ref } from 'vue';
import { reactive, toRaw } from 'vue';
const email = ref('');
const password = ref('');
function loginUser() {
  const { supabase } = useSupabase();

  console.log( supabase.auth.signInWithPassword({
    email: toRaw(email.value),
    password: toRaw(password.value),
  }));
}
</script>

<template>
  <div class="login">
    <h1 style="">Login</h1>
    
    
    <div id="email-field">
      <i class="fa-solid fa-envelope"></i>
      <input :type='text'
        placeholder="Enter your email" v-model="email"
         
      /></div>
    

    <div id="login-field" class="relative max-w-xs mt-2">
      <button
        @click="togglePasswordVisibility"
        class="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
      >
        <template v-if="isPasswordHidden">
        <i class="fa-solid fa-eye-slash"></i>
        </template>
        <template v-else>
          <i class="fa-solid fa-eye" ></i>
        </template>
      </button>
      <input
        :type="isPasswordHidden ? 'password' : 'text'"
        placeholder="Enter your password" v-model="password"
         
      />
      
      
    </div>
    <button class="login-button" @click="loginUser()">Login</button>
  </div>
  
</template>





<script>

export default {
  data() {
    return {
      isPasswordHidden: true
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordHidden = !this.isPasswordHidden;
    }
  }
};
</script>
<style>
h1{
  
  color:hsla(160, 100%, 37%, 1);
  font-weight: 500;
  text-shadow: 1px 2px 5px  rgba(0, 189, 47, 0.705);
  place-items: flex-start;
  font-size: 3rem;
  margin-top: 5%;
  margin-bottom: 2.5%;
}

input {
  color: var(--color-text);
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 1rem;
  
}
input:focus,
input:focus-visible {
  /* Odstraní standardní modrý rámeček, který prohlížeče přidávají */
  outline: none; 
  
  /* Resetuje/zachová původní rámeček (border), pokud jej používáte */
  border-color: initial; 
  /* NEBO nastaví konkrétní barvu, která se neliší od normálního stavu */
  /* border-color: #555555; */ 
  
  /* Odstraní případné stíny, které by mohly být přidány (box-shadow) */
  box-shadow: none; 
  width: 100%;
}


button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;


}

button:focus{
  outline: none;
  border: none;
}
i {
  font-size: 1.45rem;
  width: 35px;
  color: var(--color-text);

  margin: 5px;
}

.login {
  display: flex;
  flex-direction: column;
  
   justify-content: space-between;
  align-items: center;
 
  
  gap: 1rem;
  margin-bottom: 1.5rem;
  border: 2px solid #ffffff52;
  padding: 15px;
  border-radius: 0.6rem;
  background-color: #ebe7e709;

  
}
.login-button {
  width: 70%;
  padding: 0.8rem;
 
  color: whitesmoke;
  border-radius: 0.6rem;
  background-color:  hsla(160, 100%, 37%, 1);
  box-shadow: 1px 2px 15px  rgba(0, 189, 47, 0.705);
  font-size: 1.3rem;
  cursor: pointer;
  margin-bottom: 15px;
  font-weight: 600;
}
.login-button:hover {
  background-color: hsla(160, 100%, 42%, 1);
  scale: 1.02;
}
#login-field ,#email-field{
  display: flex;
  align-items: center;
  width: 70%;
  padding: 4px;
  border: 1px solid var(--color-text);
 
  border-radius: 0.6rem;
  
  
}
#login-field:focus-within,#email-field:focus-within {
   box-shadow: 1px 2px 15px  rgba(235, 235, 235, 0.384);
}


 

</style>