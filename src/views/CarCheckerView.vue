<script setup>
import Car from '../components/Car.vue'
import { useSupabase } from '@/utils/supabase'; 
import { ref } from 'vue';
const { supabase } = useSupabase();

const num_plate = ref('');
const country = ref('');
const vehiclesRef = ref([]);
async function getData() {
    let  { data: vehicles, error } = await supabase
  .from('vehicles')
  .select()

    console.log(vehicles)
  if (vehicles) {
        vehiclesRef.value = vehicles; // Předpokládejme, že reaktivní proměnná se jmenuje vehiclesRef
       
    } 

}

async function handleDeleteCar(vinToDelete) {
    
    // 1. Zkontroluj, co přišlo (pro debug)
   

    // 2. Odešli požadavek na Supabase pro smazání
    const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('vin', vinToDelete); // Smaže řádek, kde 'vin' odpovídá

    if (error) {
        console.error('Chyba při mazání ze Supabase:', error);
        return;
    }

    // 3. Aktualizuj lokální stav (pole vehicles), aby se komponenta automaticky překreslila
    vehiclesRef.value = vehiclesRef.value.filter(car => car.vin !== vinToDelete);
    
    console.log(`Vozidlo ${vinToDelete} úspěšně smazáno.`);
}


getData();





async function decodeVIN(vin, country) {
  // použití parametru vin místo hardcoded stringu
  const response = await fetch(`https://api.carapi.dev/v1/vin-decode/${vin}?token=${import.meta.env.VITE_CAR_API_KEY}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) {
    throw new Error(`decodeVIN failed: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

async function insertCarData(specResponse,stolenResponse) {
    // 1. Zkontrolujeme, zda se VIN shodují a zda máme základní data
    if (!specResponse || specResponse.vin !== stolenResponse.vin) {
        console.error("Data jsou neúplná nebo VIN neodpovídá.");
        return;
    }

    // 2. Vytvoříme objekt PŘESNĚ odpovídající SCHÉMATU tabulky 'vehicles'
    const carRecord = {
        // Sloupec 1: vin (text)
        vin: specResponse.vin, 
        
        // Sloupec 2: plate (text)
        // Používáme plateNumber.plateNumber z API a mapujeme na 'plate' v DB
        plate: specResponse.plateNumber.plateNumber, 

        // Sloupec 3: stolen (json)
        // Vložíme celý JSON objekt ze Stolen Response, ale můžeme ho zjednodušit
        stolen: {
            status: stolenResponse.stolen,
            countries: stolenResponse.countries
        },
        
        // Sloupec 4: specs (json)
        // Mapujeme 'specifications' z API na 'specs' v DB
        specs: specResponse.specifications,
        
        // Sloupec 5: features (json)
        features: specResponse.features,
        
        // Sloupec 6: country (text)
        country: specResponse.plateNumber.country,
        
        // Sloupec 7: photos (jsonb) - Není v API, takže bude null nebo prázdné pole/objekt
        photos: [] 
    };

    console.log("Připravený záznam pro DB:", carRecord);
    
    // 3. Vložení záznamu do Supabase
    const { data, error } = await supabase
        .from('vehicles')
        .insert([carRecord]) // Vložíme náš zmapovaný objekt
        .select();

    if (error) {
        console.error('Chyba při vkládání dat:', error);
        return;
    }

    console.log('Data úspěšně vložena:', data);
    return data;
}

async function fetchCarData() {
  try {
    const resp = await fetch(`https://api.carapi.dev/v1/plate-to-vin/${num_plate.value}?country=${country.value}&token=${import.meta.env.VITE_CAR_API_KEY}`);
    if (!resp.ok) throw new Error('plate-to-vin failed');
    const plateData = await resp.json();
    const vin = plateData.vin;
    if (!vin) throw new Error('VIN not found for plate');

    // stolen check používá skutečné VIN a env token
    const stolenResp = await fetch(`https://api.carapi.dev/v1/stolen-check/${vin}?token=${import.meta.env.VITE_CAR_API_KEY}`);
    if (!stolenResp.ok) throw new Error('stolen-check failed');
    const stolenData = await stolenResp.json();

    const vehicleData = await decodeVIN(vin, country.value);

    // Normalize object to match DB schema (vin, plate, country, stolen, specs, features)
    const carRecord = {
      vin: vehicleData.vin ?? vin,
      plate: vehicleData.plateNumber?.plateNumber ?? num_plate.value,
      country: vehicleData.plateNumber?.country ?? country.value,
      stolen: {
        status: stolenData.stolen ?? stolenData.status ?? 'unknown',
        raw: stolenData
      },
      specs: vehicleData.specifications ?? vehicleData.specs ?? {},
      features: vehicleData.features ?? []
    };

    // vložíme do DB a použijeme data vrácená Supabase (tak budeme konzistentní)
    const { data: inserted, error } = await supabase
      .from('vehicles')
      .insert([carRecord])
      .select()
      .single();

    if (error) throw error;

    // pushneme objekt, který vrací DB (má správná pole)
    vehiclesRef.value.push(inserted);

    num_plate.value = '';
    country.value = '';

  } catch (err) {
    console.error('fetchCarData error:', err);
  }
}

</script>

<template>
  <div class="dashboard-container">
    <h1>Car checker</h1>
    
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
      <button @click="fetchCarData()">Check</button>
    </div>
   
    <div class="cars-grid">
        <Car 
          v-for="(vehicle, index) in vehiclesRef" 
          :key="vehicle.vin ?? vehicle.id ?? index" 
          :vin="vehicle.vin"
          :number-plate="vehicle.plate ?? (vehicle.plateNumber?.plateNumber ?? '')"
          :country="vehicle.country ?? (vehicle.plateNumber?.country ?? '')"
          :stolen="vehicle.stolen ?? { status: 'no data' }"
          :specs="vehicle.specs ?? vehicle.specifications ?? {}"
          :features="vehicle.features ?? []"
          
          @delete-car="handleDeleteCar"
        />
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