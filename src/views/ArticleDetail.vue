<template>
  <div>
    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
    </el-button-group>
    <h3>{{ article.title }}</h3>
    <p v-html="article.body" class="indent"></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {}
    }
  },
  methods: {
    fetch () {
      this.$http.get(`/article/${this.$route.params.id}`).then(res => {
        this.article = res.data
      })
    },
    back () {
      // history.back()
      history.go(-1)
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped>
  h3{
    text-align: center;
  }
  p{
    text-indent: 2em;
  }
  /* 深度作用选择器 */
  .indent >>>.ql-syntax {
    background-color: #23241f;
    color: #f8f8f2;
    overflow: visible;
    padding: 5px 10px;
    border-radius: 3px;
    margin-left: 2.5em;
    text-indent: 0;
  }
</style>
