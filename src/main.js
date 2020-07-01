import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import './plugins/echarts.js'
import './plugins/quill-editor.js'
import './registerServiceWorker.js'

Vue.config.productionTip = false

// 创建一个接口和地址,定义到Vue的原型上
Vue.prototype.$http = axios.create({
  // baseURL: '/api' // 前端使用 devServer.proxy 代理处理跨域(vue.config.js)
  baseURL: 'http://localhost:3000/api' // 后端使用 cors 包处理跨域(serve/index.js)
  // baseURL: 'http://localhost:9999/api'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
