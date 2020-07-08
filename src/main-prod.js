import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import './plugins/element.js'
// import './plugins/echarts.js' 在vue.config.js 文件中忽略打包不生效, 现在只能注释引入从而达到打包资源大小最小化
import './plugins/quill-editor.js'

// 注释掉 plugins/echarts.js 文件的引入后, 需自行引入 vue-echarts 并将其注册为全局组件, 否则项目中的 vue-echarts 标签将会无法被解析
import ECharts from 'vue-echarts'
// 注册组件后即可使用 (全局注册)
Vue.component('v-chart', ECharts)

// 创建一个接口和地址,定义到Vue的原型上
Vue.prototype.$http = axios.create({
  // baseURL: '/api' // 前端使用 devServer.proxy 代理处理跨域(vue.config.js)
  baseURL: 'http://localhost:3000/api' // 后端使用 cors 包处理跨域(serve/index.js)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
