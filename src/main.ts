import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VCalendar from 'v-calendar';
import './scss/index.scss';
import 'v-calendar/dist/style.css';
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(VCalendar)
app.use(pinia)
app.mount('#app');

