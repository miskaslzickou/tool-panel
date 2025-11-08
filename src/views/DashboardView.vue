<script setup>
import Car from '../components/Car.vue'
import { useSupabase } from '@/utils/supabase'; 
import { ref } from 'vue';
const { supabase } = useSupabase();

const num_plate = ref('');
const country = ref('');
async function decodeVIN(vin, country) {
    const response = await fetch(`https://api.carapi.dev/v1/vin-decode/1HGBH41JXMN109186?token=${import.meta.env.VITE_CAR_API_KEY}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});
  
    const data = await response.json();
    console.log(data);
}

function fetchCarData() {
    
 
}

</script>

<template>
  <div class="dashboard-container">
    <h1>Welcome</h1>
    
    <div class="search-wrapper">
      <input 
        type="text" 
        placeholder="Numplate to check" 
        v-model="num_plate"
      />
      <input 
        type="text" 
        placeholder="Country code" 
        v-model="country"
      />
      <button @click="checkCar()">Check</button>
    </div>
   
    <div class="cars-grid">
      <Car />
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

h1 {
    font-size: 2.5rem;
    color: var(--color-text);
    margin: 0;
}

.search-wrapper {
    display: flex;
    gap: 1rem;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

input {
    flex: 1;
    min-width: 200px;
    color: var(--color-text);
    border: 2px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 0.8rem 1rem;
    background-color: var(--color-background-soft);
    font-size: 1rem;
}

input:focus {
    border-color: hsla(160, 100%, 37%, 1);
    box-shadow: 0 0 0 2px hsla(160, 100%, 37%, 0.1);
    outline: none;
}

button {
    padding: 0.8rem 2rem;
    font-size: 1rem;
    background-color: hsla(160, 100%, 37%, 1);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 120px;
}

button:hover {
    background-color: hsla(160, 100%, 42%, 1);
    transform: translateY(-1px);
}

.cars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;


}

@media (max-width: 768px) {
    .search-wrapper {
        flex-direction: column;
        align-items: stretch;
    }
    
    input, button {
        width: 100%;
    }
    
    .dashboard-container {
        padding: 1rem;
        
    }
}
</style>