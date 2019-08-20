import '@material/elevation/dist/mdc.elevation.min.css';
import Vue from 'vue';

import './polyfills';
import './styles.less';

import { AppPlugin } from '@/plugins';
import { router } from '@/router';
import { buildStore } from '@/store';

import App from './app.vue';

Vue.config.productionTip = false;

Vue.use(new AppPlugin());

new Vue({
  router,
  store: buildStore(),
  render: h => h(App),
}).$mount('#app');
