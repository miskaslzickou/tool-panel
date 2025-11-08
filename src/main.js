import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/auth';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)


const app = createApp(App)
const pinia = createPinia();








app.use(pinia);
app.use(router)
const authStore = useAuthStore();
await authStore.loadUser();

app.mount('#app')



