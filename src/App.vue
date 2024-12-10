<script setup>
import ChartComponent from './components/ChartComponent.vue';
import DatatableComponent from './components/DatatableComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue';
import SearchBarComponent from './components/SearchBarComponent.vue';
import SummaryComponent from './components/SummaryComponent.vue';


</script>

<template>
  <SearchBarComponent />
  <HeaderComponent />
  <div class="container">
    <div class="chart">
      <ChartComponent />
    </div>
    <div class="summary">
      <SummaryComponent />
    </div>
  </div>

  <DatatableComponent />
</template>

<style>
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
}

.chart {
    width: 75%;
}
.summary {
    width: 25%;
}


@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
    .chart,
    .summary {
        width: 100%; 
        margin-bottom: 10px;
    }
}
</style>
