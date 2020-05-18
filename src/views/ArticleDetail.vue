<template>
  <div>
    <h3>{{article.title}}</h3>
    <p>{{article.body}}</p>
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
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style></style>
