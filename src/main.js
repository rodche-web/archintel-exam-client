import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import axios from './plugins/axios'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.provide('axios', axios)

app.mount('#app')