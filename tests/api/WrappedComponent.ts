import {createApp} from "vue";
import store from '../../src/store';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from '../../src/components/api/NewlyCreatedUser.vue';

export const WrappedComponent = () => {
    createApp(App)
        .use(store)
        .use(VueAxios, axios)
        .mount('#root');
}