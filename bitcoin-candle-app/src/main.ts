import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import store from './store'

createApp(App)
    .use(store)
    .use(VueApexCharts)
    .mount('#app')
