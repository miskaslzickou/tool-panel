<script setup>
import { ref, onMounted } from 'vue';
import LineChart from '@/components/LineChart.vue'; // Změň cestu, pokud je LineChart jinde

// 1. Reaktivní proměnná pro ukládání dat (POUŽÍVANÁ V TEMPLATE)
const cryptoChart = ref({ labels: [], datasets: [] });


// 2. Asynchronní funkce pro stažení a zpracování dat
async function fetchAndProcessBtcData() {
    const url = 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=30';
    
    try {
        const response = await fetch(url);

        const klines = await response.json();


        if (!Array.isArray(klines)) {
             console.error("Chybná odpověď z Binance API.");
             return;
        }


        // Zpracování dat:
        const labels = klines.map(kline => {
            // [0] je Open time
            return new Date(kline[0]).toLocaleDateString('cs-CZ');
        });
        
        const prices = klines.map(kline => {
            // [4] je Close price
            return parseFloat(kline[4]); 
        });

        // 3. Aktualizace reaktivní proměnné v rodiči
        cryptoChart.value = {
            labels: labels,
            datasets: [
                {
                    label: 'Cena BTC/USDT',
                    data: prices,
                    borderColor: '#f0b90b',
                    backgroundColor: 'rgba(240, 185, 11, 0.2)',
                    tension: 0,
                    fill: true
                }
            ]
        };
        
    } catch (error) {
        console.error("Chyba při stahování BTC dat:", error);
    }
}

// 4. Spustíme načítání dat po namountování rodiče
onMounted(() => {
    fetchAndProcessBtcData();
});
</script>

<template>
  <div class="dashboard-wrapper">
    <h1>Krypto Analytický Panel</h1>
    
    <LineChart 
      :chart-data="cryptoChart" 
    />
  </div>
</template>

<style scoped>
.dashboard-wrapper {
    padding: 20px;
}
h1 {
    text-align: center;
    margin-bottom: 30px;
}
</style>