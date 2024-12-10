<script setup>
import { ref, computed } from 'vue';
import Divider from 'primevue/divider';

import { useInstrumentStore } from '../stores/instrument.js'

const store = useInstrumentStore();

const selectedSummary = computed(() => {
    switch (store.globalID) {
        case 'AGUAS-A':
            return store.summary['AGUAS-A'];
        case 'ANDINA-B':
            return store.summary['ANDINA-B'];
        case 'BCI':
            return store.summary.BCI;
        case 'BSANTANDER':
            return store.summary.BSANTANDER;
        case 'CAP':
            return store.summary.CAP;
        default:
            return store.summary.IPSA;
    }
});

const currentVar = computed(() => {
    const currentPrice = selectedSummary.value?.price?.lastPrice || 0;
    const lastPrice = selectedSummary.value?.price?.closePrice || 0;

    if (lastPrice === 0) return 0;

    const variation = (((currentPrice - lastPrice) / lastPrice) * 100);
    return parseFloat(variation.toFixed(2));
})

const varPuntos = computed(() => {
    const currentPrice = selectedSummary.value?.price?.lastPrice || 0;
    const lastPrice = selectedSummary.value?.price?.closePrice || 0;

    const varCurrentPuntos = currentPrice - lastPrice;
    return parseFloat(varCurrentPuntos.toFixed(2));
})

const colorValue = (value) => value > 0 ? "positive" : value < 0 ? "negative" : "neutral";

</script>

<template>
    <h2>{{ store.globalID }}</h2>
    <p>Indice</p>
    <Divider class="divider" />
    <div class="horizontal-container">
        <p>Valor Actual <span style="color: white;">{{ selectedSummary.price.lastPrice }}</span></p>
        <p>Var.% Actual <span :class="colorValue(currentVar)">{{ currentVar }}%</span></p>
        <p>Var Puntos Actual <span :class="colorValue(varPuntos)">{{ varPuntos }}</span></p>
    </div>
    <Divider class="divider" />

</template>

<style>
.horizontal-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    margin: 10px 0 10px 0;
    color: rgb(115, 114, 114);
}

@media (max-width: 768px) {
    .horizontal-container {
        width: 100%;
        flex-wrap: wrap;
        text-align: start;
    }

    .horizontal-container p {
        width: 100%;
        margin: 5px 0;
    }
}

.positive {
    color: rgb(12, 232, 12);
}

.negative {
    color: rgb(244, 57, 57);
}

.neutral {
    color: white;
}
</style>
