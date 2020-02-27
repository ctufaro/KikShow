import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import './plugins/base'
import App from './App.vue'
import router from './router'
import store from './store'
import 'regenerator-runtime'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
