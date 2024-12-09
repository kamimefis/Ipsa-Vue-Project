<script setup>
import { ref, computed } from 'vue'
import Chart from 'primevue/chart';
import 'chartjs-adapter-date-fns';

import { useInstrumentStore } from '../stores/instrument.js';

const store = useInstrumentStore();

const globalID = computed(() => store.globalID);

const INSTRUMENT_PERIODS = {
  '1M': 30,
  '3M': 90,
  '6M': 180,
  '1A': 365,
};

const selectedPeriod = ref('1M');

const filterHistoricData = (periodInDays, historicArray) => {
  const nowTs = Math.floor(Date.now() / 1000);
  const periodSeconds = periodInDays * 24 * 60 * 60;
  const cutoffTs = nowTs - periodSeconds;
  return historicArray.filter(
    (item) => item.datetimeLastPriceTs >= cutoffTs
  );
};

const whichHistoryArrayToUse = computed(() => {
  switch (store.globalID) {
    case 'ANDINA-A':
      return store.histories['ANDINA-A'];
    case 'AGUAS-B':
      return store.histories['AGUAS-B'];
    case 'BCI':
      return store.histories.BCI;
    case 'BSANTANDER':
      return store.histories.BSANTANDER;
    case 'CAP':
      return store.histories.CAP;
    default:
      return store.histories.IPSA;
  }
});

const filteredData = computed(() => {
  const days = INSTRUMENT_PERIODS[selectedPeriod.value] || 30;
  const result = filterHistoricData(days, whichHistoryArrayToUse.value);
  // if (result.length === 0) {
  //   console.log('No hay datos disponibles para el período seleccionado.');
  // }
  return result;
});



//CHART
const lineChartData = computed(() => ({
  labels: filteredData.value.map((entry) =>
    new Date(entry.datetimeLastPriceTs * 1000).toLocaleDateString('es-CL')
  ),
  datasets: [
    {
      label: `${store.globalID} (${selectedPeriod.value})`,
      data: filteredData.value.map((item) => item.lastPrice),
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.4,
    },
  ],
}));


const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Fecha',
      },
      ticks: {
        autoSkip: true, 
        maxTicksLimit: 5,
      }
    },
    y: {
      title: {
        display: true,
        text: 'Precio',
      },
    },
  },
};
</script>

<template>
  <div class="container-div">
    <div class="info-error" v-if="filteredData.length === 0">
      <p class="color= white">No hay datos disponibles para el período seleccionado</p>
    </div>
    <Chart type="line" :data="lineChartData" :options="chartOptions" :height=90 />

    <div class="period-buttons">
      <button v-for="(days, period) in INSTRUMENT_PERIODS" :key="period" @click="selectedPeriod = period"
        :class="{ active: selectedPeriod === period }">
        {{ period }}
      </button>
    </div>

  </div>
</template>

<style>
.container-div {
  position: relative;
}

.info-error {
  position: absolute;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.period-buttons {
  margin-bottom: 1rem;
}

.period-buttons button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
  background-color: #3f3f3f;
  color: white;
  border-radius: 5px;
  font-size: 1rem;
}

.period-buttons button.active {
  background-color: #007ad9;
  color: black;
}
</style>
