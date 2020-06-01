import Vue from 'vue'
import App from './App.vue'
import Ionic from '@ionic/vue'
import '@ionic/core/css/ionic.bundle.css'
import './registerServiceWorker'

Vue.use(Ionic);

Vue.config.productionTip = false

let bus = new Vue();
Vue.prototype.$bus = bus;

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
