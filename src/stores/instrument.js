import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jsonConstituentsList from '../json/json-VueJS/constituyentes/constituensList.json';
//Histories:
import historyIPSA from '../json/json-VueJS/history/history-IPSA.json';
import historyCAP from '../json/json-VueJS/history/history-CAP.json';
import historyBSANTANDER from '../json/json-VueJS/history/history-BSANTANDER.json';
import historyBCI from '../json/json-VueJS/history/history-BCI.json';
import historyANDINA from '../json/json-VueJS/history/history-ANDINA-B.json';
import historyAGUAS from '../json/json-VueJS/history/history-AGUAS-A.json';

export const useInstrumentStore = defineStore('instrument', {
  state: () => ({
    constituents: [],

    histories: {
      IPSA: historyIPSA.data.chart,
      CAP: historyCAP.data.chart,
      BSANTANDER: historyBSANTANDER.data.chart,
      BCI: historyBCI.data.chart,
      "ANDINA-A": historyANDINA.data.chart,
      "AGUAS-B": historyAGUAS.data.chart,
    },

    globalID: "IPSA",
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
    },

    setGlobalID(newID) {
      // console.log("globalID:", newID);
      this.globalID = newID;
    },
    
  }
})
