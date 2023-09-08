import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { getLeagues } from './api/api'



createApp(App)
.use(createPinia())
.mount('#app')

