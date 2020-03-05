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

//Vue.prototype.$hostname = 'https://192.168.1.45:45455/api'
Vue.prototype.$hostname = 'https://kikshowapi.azurewebsites.net/api'
Vue.prototype.$blob = 'https://kikimageblobs.blob.core.windows.net/imagecontainer/'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
