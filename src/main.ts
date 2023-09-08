import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { getLeagues } from './api/api'
import {createVuetify} from 'vuetify';

import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App)
.use(createPinia())
.use(vuetify)
.mount('#app')

