import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import DatetimePicker from 'vuetify-datetime-picker';
Vue.use(DatetimePicker);
Vue.use(VueSweetalert2);
//Vue.use(DatetimePicker);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
