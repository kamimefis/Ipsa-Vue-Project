<script setup>
import { ref, computed, onMounted } from "vue";
import 'primeicons/primeicons.css'

import { useInstrumentStore } from '../stores/instrument.js';

const store = useInstrumentStore();
// store.loadData();

const searchQuery = ref("");

// Función para buscar y actualizar globalChartID
const onSearch = () => {
  const query = searchQuery.value.toUpperCase(); 
  const validIDs = ["IPSA", "AGUAS-A", "ANDINA-B", "BCI", "BSANTANDER", "CAP"];

  if (validIDs.includes(query)) {
    store.setGlobalID(query);
  } else {
    store.setGlobalID("IPSA");
  }
};

</script>

<template>
    <div class="search-bar">
    <div class="search-container">
      <span class="pi pi-search"></span>&nbsp;
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Busca un instrumento"
        @input="onSearch"
      />
    </div>
  </div>
</template>

<style>
.search-bar {
  margin-bottom: 15px;
}

.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  background-color: #474747;
}

.search-container input {
  border: none;
  outline: none;
  flex: 1;
  background-color: #474747;
  color: white;
}
</style>