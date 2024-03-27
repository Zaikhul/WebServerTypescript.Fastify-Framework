import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

// vendors CSS Files
import './vendors/bootstrap/css/bootstrap.min.css'
import './vendors/bootstrap/css/style.bootstrap.css'
import './vendors/bootstrap-icons/bootstrap-icons.css'
import './vendors/boxicons/css/boxicons.min.css'
import './vendors/glightbox/css/glightbox.min.css'
import './vendors/remixicon/remixicon.css'
import './vendors/swiper/swiper-bundle.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
