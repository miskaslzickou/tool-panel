<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { defineEmits } from 'vue'; // Import pro definici událostí

// 1. Změna chybných typů JSON na Object
const props = defineProps({
    vin: {
        type: String,
        required: true,
    },
    numberPlate: {
        type: String,
        required: true,
    }, 
    stolen: {
        type: Object, // ⬅️ OPRAVA: Místo JSON použij Object
        required: false,
        default: () => ({ status: 'no data' }) 
    },
    specs: {
        type: Object, // ⬅️ OPRAVA: Místo JSON použij Object
        required: false,
        default: () => ({ status: 'no data' })
    },
    country: {
        type: String,
        required: false,
        default: 'no data'
    },
    // 2. Přidání chybějící prop 'features', pokud ji chceš používat v template
    features: {
        type: Array,
        required: false,
        default: () => []
    }
});

// 3. Definice události, kterou komponenta vyvolá (emituje)
// Tuto událost zachytí rodičovská komponenta, aby provedla skutečné mazání.
const emit = defineEmits(['delete-car']);

// 4. Implementace funkce, která je volána při kliknutí na tlačítko
function deleteCar() {
    // Emitujeme událost 'delete-car' a předáme unikátní identifikátor vozu, 
    // aby rodič věděl, které auto má smazat. Použijeme např. VIN.
    emit('delete-car', props.vin);
}

// Při používání <script setup> není potřeba explicitně exportovat deleteCar, 
// je automaticky přístupné v <template>.

</script>

<template>
  <div class="car-card">
    <header> 
        <h2>Car Information</h2>
        <button class="delete-button" @click="deleteCar">
            <font-awesome-icon icon="fa-solid fa-trash" /> Delete
        </button>
    </header>
    
    <p><strong>VIN:</strong> {{ props.vin }}</p>
    <p><strong>Number Plate:</strong> {{ props.numberPlate }}</p>
    <p><strong>Country:</strong> {{ props.country }}</p>
    <p><strong>Stolen:</strong> {{ props.stolen.stolen }}</p>
    
    <div v-if="props.specs && props.specs.make">
        <h3>Specifications:</h3>
        <p><strong>Make:</strong> {{ props.specs.make }}</p>
        <p><strong>Model:</strong> {{ props.specs.model }}</p>
        <p><strong>Year:</strong> {{ props.specs.year }}</p>
    </div>

    

    <div v-if="props.features && props.features.length">
        <h3>Features:</h3>
        <ul>
            <li v-for="(feature, index) in props.features" :key="index">{{ feature }}</li>
        </ul>
    </div>

  </div>
</template>

<style scoped>
/* Styly jsou v pořádku, ponechány beze změny */
/* ... */
.car-card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.delete-button {
    color:#f07575;
    background-color: transparent;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    float: right;
} 
.delete-button:hover {
    background-color: #f0020252;
}
h2{
    font-weight: 500;
    text-shadow: 1px 2px 8px  var(--color-text);
    place-items: flex-start;
}
</style>