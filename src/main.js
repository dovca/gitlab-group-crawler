import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

import App from '@/App';
import vuetify from '@/plugins/vuetify';
import store from '@/store';

import './libs/validationTypes';

Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
