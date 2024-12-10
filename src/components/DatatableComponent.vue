<script setup>
import { ref, computed } from 'vue';
import { useInstrumentStore } from '../stores/instrument.js'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';

const store = useInstrumentStore();
store.loadData();
const constituents = store.constituents

//Computed para filtrar filas basado en `globalID`, pero mostrando todo si es "IPSA"
// const filteredConstituents = computed(() => {
//     const globalID = store.globalID;
//     if (globalID === "IPSA") return constituents;
//     return constituents.filter((row) => row.name === globalID);
// });

const colorValue = (value) => value > 0 ? "positive" : value < 0 ? "negative" : "neutral";

const clickOnRow = (event) => {
    // console.log("you click on me",event.data.name );
    const validIDs = ["IPSA", "AGUAS-A", "ANDINA-B", "BCI", "BSANTANDER", "CAP"];
    const selectedID= event.data.name;

  if (validIDs.includes(selectedID)) {
    store.setGlobalID(selectedID);
  } else {
    store.setGlobalID("IPSA");
  }

}

</script>

<template>
    <Divider class="divider" />
    <div class="card" style="margin-top: 1rem;">
        <DataTable :value="constituents" sortMode="multiple" tableStyle="min-width: 50rem" scrollable
            scrollHeight="400px" @row-click="clickOnRow">
            <Column field="name" header="Nombre" sortable style="width: 22%"></Column>
            <Column field="lastPrice" header="Último" sortable style="width: 13%"></Column>
            <Column field="volumeMoneyMM" header="Monto(MM)" sortable style="width: 13%"></Column>
            <Column field="pctDay" header="Var día" sortable style="width: 13%">
                <template #body="slotProps" #option="slotProps">
                    <span :class="colorValue(slotProps.data.pctDay)">
                        {{ slotProps.data.pctDay }}%
                    </span>
                </template>
            </Column>
            <Column field="pct30D" header="Var 30d" sortable style="width: 13%">
                <template #body="slotProps" #option="slotProps">
                    <span :class="colorValue(slotProps.data.pct30D)">
                        {{ slotProps.data.pct30D }}%
                    </span>
                </template>
            </Column>
            <Column field="pctCY" header="Año Actual" sortable style="width: 13%">
                <template #body="slotProps" #option="slotProps">
                    <span :class="colorValue(slotProps.data.pctCY)">
                        {{ slotProps.data.pctCY }}%
                    </span>
                </template>
            </Column>
            <Column field="pct1Y" header="12 Meses" sortable style="width: 13%">
                <template #body="slotProps" #option="slotProps">
                    <span :class="colorValue(slotProps.data.pct1Y)">
                        {{ slotProps.data.pct1Y }}%
                    </span>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style>
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
