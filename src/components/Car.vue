<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const props = defineProps({
  vin: {
    type: String, // Očekáváme string
    required: true, // Prop je povinný
     
  },
  numberPlate: {
    type: String,
    required: true,
  }, 
  stolen :{
    type: JSON,
    required: false,
    default: () => ({ status: 'no data' }) // Výchozí hodnota, pokud není předán prop
  },
  specs:{
    type: JSON,
    required: false,
    default: () => ({ status: 'no data' }) // Výchozí hodnota, pokud není předán prop

  },
  country:{
    type: String,
    required: false,
    default: 'no data'
  }
});







</script>
<template>
  <div class="car-card">
    <header> <h2>Car Information</h2>
    <button class="delete-button" @click="deleteCar"><font-awesome-icon icon="fa-solid fa-trash" /> Delete</button></header>
   
    <p><strong>VIN:</strong> {{ vin }}</p>
    <p><strong>Number Plate:</strong> {{ numberPlate }}</p>
    <p><strong>Country:</strong> {{ country }}</p>
    <p><strong>Stolen:</strong>{{ stolen.stolen }}</p>
    <div v-if="specs && specs.make">
      <h3>Specifications:</h3>
      <p><strong>Make:</strong> {{ specs.make }}</p>
      <p><strong>Model:</strong> {{ specs.model }}</p>
      <p><strong>Year:</strong> {{ specs.year }}</p>
    </div>

    <div v-if="features">
      <h3>Features:</h3>
      <ul>
        <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
      </ul>
    </div>

  </div>
</template>
<style scoped>
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
  text-shadow: 1px 2px 8px  var(--color-text);
  place-items: flex-start;
  

  
}


</style>