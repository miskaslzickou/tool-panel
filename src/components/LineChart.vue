<script setup>
// Upozornění: Funkce fetchBtcData a onMounted jsou odstraněny!
import { Line } from 'vue-chartjs' 
import { 
    Chart as ChartJS, 
    Title, 
    Tooltip, 
    Legend, 
    LineElement, 
    PointElement, 
    CategoryScale, 
    LinearScale 
} from 'chart.js'

ChartJS.register(
    Title, 
    Tooltip, 
    Legend, 
    LineElement, 
    PointElement, 
    CategoryScale, 
    LinearScale
)

// Definujeme props, které budou přijímat data z rodiče
const props = defineProps({
  chartData: { // Objekt ve formátu Chart.js
    type: Object,
    required: true
  },
  chartOptions: { // Volitelné nastavení
    type: Object,
    default: () => ({ 
        responsive: true, 
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: false } }
    })
  }
})
</script>

<template>
  <div class="chart-container">
    <h2>BTC/USDT - Posledních 30 Dní</h2>
    <Line
      v-if="props.chartData && props.chartData.labels.length" 
      :data="props.chartData"
      :options="props.chartOptions"
    />
    <p v-else>Načítám historická data...</p>
  </div>
</template>

<style scoped>
/* Styly zůstávají stejné */
.chart-container {
    height: 450px; 
    width: 900px;
    margin: 20px auto;
    /* ... ostatní styly ... */
}
</style>