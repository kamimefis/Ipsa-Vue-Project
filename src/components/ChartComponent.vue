<script setup>
import { ref, computed } from 'vue'
import Chart from 'primevue/chart';
import { useInstrumentStore } from '../stores/instrument.js';

const store = useInstrumentStore();
const histories = store.histories;
console.log(histories);


const INSTRUMENT_PERIODS = {
  '1M': 30,
  '3M': 90,
  '6M': 180,
  '1A': 365,
};

const selectedPeriod = ref('1M');



</script>

<template>
  hola
</template>

<style></style>
