<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// Musíš zaregistrovat moduly, které bude graf používat
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// 1. Definujeme reaktivní data grafu (props)
const props = defineProps({
  chartData: { // Objekt obsahující labels a datasets
    type: Object,
    required: true
  },
  chartOptions: { // Volitelné nastavení grafu (barvy, osy, atd.)
    type: Object,
    default: () => ({ responsive: true })
  }
})

</script>
<template>
<Bar
    :data="props.chartData"
    :options="props.chartOptions"
  />


</template>