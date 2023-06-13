import { createApp } from 'vue';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import App from './App.vue';

createApp(App)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app');