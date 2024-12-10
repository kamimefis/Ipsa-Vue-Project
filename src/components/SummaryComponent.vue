<script setup>
import { computed } from 'vue'
import Divider from 'primevue/divider';

import { useInstrumentStore } from '../stores/instrument.js';
const store = useInstrumentStore();

// console.log(store.summary.IPSA.info.marketName);

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
</script>

<template>
    <div class="container header">
        <p>Resumen</p>
        <Divider class="divider" />

        <div class="container-box header">
            <p class="left">Cotización</p>
            <p class="right">{{ selectedSummary.price.datetimeLastPrice }}</p>
        </div>

        <Divider class="divider" />

        <div class="container-box">
            <p class="left">MERCADO</p>
            <p class="right">{{ selectedSummary.info.marketName }}</p>
        </div>
        <div class="container-box">
            <p class="left">APERTURA</p>
            <p class="right">{{ selectedSummary.price.lastPrice }}</p>
        </div>
        <div class="container-box">
            <p class="left">CIERRE ANTERIOR</p>
            <p class="right">{{ selectedSummary.price.closePrice }}</p>
        </div>
        <div class="container-box">
            <p class="left">MÁXIMO DIARIO</p>
            <p class="right">{{ selectedSummary.price.maxDay }}</p>
        </div>
        <div class="container-box">
            <p class="left">MÍNIMO DIARIO</p>
            <p class="right">{{ selectedSummary.price.minDay }}</p>
        </div>
        <div class="container-box">
            <p class="left">MÁXIMO 52</p>
            <p class="right">{{ selectedSummary.price.max52W }}</p>
        </div>
        <div class="container-box">
            <p class="left">MÍNIMO 52 SEMANAS</p>
            <p class="right">{{ selectedSummary.price.min52W }}</p>
        </div>
    </div>
</template>

<style>
.container {
    margin-right: 1rem;
    /* margin-left: 10px;
    height: 90%; */
}

.divider {
    color: rgb(64, 63, 63);
}

.container-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.left {
    text-align: start;
    display: block;
}

.right {
    text-align: end;
    display: block;
}
.header{
    padding: 10px 0 10px 0;
}
</style>