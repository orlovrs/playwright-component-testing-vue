import {createApp} from "vue";
import store from '../../src/store';

import App from '../../src/components/state-form/State.vue';

export const WrappedComponent = () => {
    createApp(App)
        .use(store)
        .mount('#root');
}