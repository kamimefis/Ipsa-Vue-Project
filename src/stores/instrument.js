import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jsonConstituentsList from '../json/json-VueJS/constituyentes/constituensList.json';

export const useInstrumentStore = defineStore('instrument', {
  state: () => ({
    constituents: [],
  }),
  getters: {

  },
  actions: {
    loadData() {
      this.constituents = jsonConstituentsList.data.constituents.map(item => ({
        name: item.codeInstrument, //Nombre
        lastPrice: item.lastPrice.toFixed(2), //Último 
        volumeMoneyMM: (item.volumeMoney / 1e6).toFixed(2), //Monto Transado (MM)
        pctDay: item.pctDay.toFixed(2), //Variación Diaria
        pct30D: item.pct30D.toFixed(2), //Variación 30 días
        pctCY: item.pctCY.toFixed(2), //Variación Año Actual
        pct1Y: item.pct1Y.toFixed(2), //Variación 12 meses
      }));
    }
  }
})
