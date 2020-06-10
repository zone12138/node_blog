import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import './registerServiceWorker.js'

Vue.config.productionTip = false

// 创建一个接口和地址,定义到Vue的原型上
Vue.prototype.$http = axios.create({
  baseURL: '/api'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
