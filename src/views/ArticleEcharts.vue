<template>
  <v-chart :options="polar" :autoresize=true />
</template>

<script>
export default {
  data () {
    return {
      polar: {},
      initOptions: {}
    }
  },
  methods: {
    fetch () {
      this.$http.get('/article').then(res => {
        this.sortArticleData(res.data)
      })
    },
    // 整理出 echarts 图配置所需要的数据格式
    sortArticleData (data) {
      const articleObj = {}
      const articleTypeArr = []
      const articleTypeCounter = []
      data.forEach(element => {
        if (Object.prototype.hasOwnProperty.call(articleObj, element.type)) {
          articleObj[element.type]++
        } else {
          articleTypeArr.push(element.type)
          articleObj[element.type] = 1
        }
      })
      for (var key in articleObj) {
        articleTypeCounter.push(articleObj[key])
      }
      this.setEchartsOptions(articleTypeArr, articleTypeCounter)
    },
    setEchartsOptions (typeArr, counterArr) {
      this.polar = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: typeArr,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '40%',
            data: counterArr
          }
        ]
      }
      window.addEventListener('resize', this.$handleResizeEcharts)
      // 可以使用 $on 或者 $once 去 hook 监听 beforeDestroy 这个生命周期, 不用单独在 beforeDestroy 这个生命周期中移除事件绑定, 事件绑定和事件移除写在一起提高代码可读性
      // 这里只是举个例子, 原本是打算在 window.onresize 中调用 echarts 的 resize 方法的, 后来发现使用了 vue-echarts , 可以使用 props 中的 autoresize 属性, 使其为 true 即可达到效果
      this.$on('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.$handleResizeEcharts)
      })
    },
    $handleResizeEcharts () {
      console.log('resize')
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped>
.echarts{
  width: 100% !important;
}
</style>
