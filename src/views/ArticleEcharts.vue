<template>
  <v-chart :options="polar" />
</template>

<script>
export default {
  data () {
    return {
      polar: {}
    }
  },
  methods: {
    fetch () {
      this.$http.get('/article').then(res => {
        this.sortArticleData(res.data)
      })
    },
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
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style></style>
