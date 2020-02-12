import Vue from 'vue';
import VueRx from 'vue-rx';
// @ts-ignore
import App from '@/App.vue';

Vue.config.productionTip = false;

Vue.use(VueRx);

new Vue({
  render: h => h(App),
}).$mount('#app');
