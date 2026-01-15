<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

async function loginUser() {
  const { data, error } = await authStore.signIn(email.value, password.value);

  if (data?.user) {
    // Uživatel je přihlášen, přesměrování na chráněnou stránku
    router.push('/dashboard/home');
  } else {
    // Zobrazit error
  }
}

const isPasswordHidden = ref(true);

function togglePasswordVisibility() {
  // don't use `this` in <script setup>; use the ref directly
  isPasswordHidden.value = !isPasswordHidden.value;
}
</script>

<template>
  <div class="login">
    <h1>Login</h1>

    <div id="email-field">
      <font-awesome-icon icon="fa-solid fa-envelope" size="2x" />
      <input
        type="text"
        placeholder="Enter your email"
        v-model="email"
      />
    </div>

    <div id="login-field" class="relative max-w-xs mt-2">
      <button
        id="toggle-password"
        @click="togglePasswordVisibility()"
        class="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
      >
        <template v-if="isPasswordHidden">
          <font-awesome-icon icon="fa-solid fa-eye-slash" size="2x" />
        </template>
        <template v-else>
          <font-awesome-icon icon="fa-solid fa-eye" size="2x" />
        </template>
      </button>
      <input
        :type="isPasswordHidden ? 'password' : 'text'"
        placeholder="Enter your password"
        v-model="password"
      />
    </div>

    <button class="login-button" @click="loginUser()">Login</button>
  </div>
</template>

<style scoped>
h1{
  color:hsla(160, 100%, 37%, 1);
  font-weight: 500;
  text-shadow: 1px 2px 5px  rgba(0, 189, 47, 0.705);
  place-items: flex-start;
  font-size: 3rem;
  margin-top: 5%;
  margin-bottom: 2.5%;
}
#toggle-password {
color: var(--color-text-);
}
input {
  color: var(--color-text);
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 1rem;
  width: 100%;
}
input:focus,
input:focus-visible {
  outline: none;
  border-color: initial;
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
  width: 40rem;
  color: var(--color-text);
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
