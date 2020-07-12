import Vue from 'vue'
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
// 需要安装依赖：npm install vue-echarts echarts --save

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts'

// 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
import 'echarts-gl'

// 注册组件后即可使用 (全局祖册)
Vue.component('v-chart', ECharts)
