<template>
  <div>
    <div style="margin-bottom:15px;">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="标题" value="title"></el-option>
          <el-option label="内容" value="body"></el-option>
          <!-- <el-option label="用户电话" value="3"></el-option> -->
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchMethod"></el-button>
      </el-input>
    </div>
    <el-table :data="articlesData">
      <el-table-column prop="title" label="标题" width="340" align="center"> </el-table-column>
      <el-table-column prop="body" label="内容" show-overflow-tooltip align="center"> </el-table-column>
      <el-table-column prop="type" label="类别" width="120" align="center"> </el-table-column>
      <el-table-column prop="dateTime" label="时间" width="180" align="center"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="show(scope.row._id)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="modify(scope.row._id)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="remove(scope.row._id)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'ArticleList',
  data () {
    return {
      articlesData: [],
      select: 'title',
      input: ''
    }
  },
  beforeRouteLeave (to, from, next) {
    // ...
    this.$store.commit('add', this.$options.name)
    console.log(this.$store.state)
    next()
  },
  methods: {
    fetch () {
      this.$http.get('/article').then(res => {
        this.articlesData = res.data
        console.log(res)
        // console.log(res.data + 'hello')
      })
    },
    show (id) {
      this.$router.push(`/article/detail/${id}`)
    },
    modify (id) {
      this.$router.push(`/article/modify/${id}`)
    },
    remove (id) {
      this.$confirm('是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`/article/${id}`).then(res => {
            this.$message({
              message: '文章删除成功',
              type: 'success'
            })
            this.fetch()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    searchMethod () {
      console.log(this.select)
      if (this.input) {
        var obj = {
          select: this.select,
          input: this.input
        }
        this.$http.post('/article/search', obj).then(res => {
          this.articlesData = res.data
        })
      } else {
        this.fetch()
      }
    }
  },

  created () {
    this.fetch()
  }
}
</script>

<style>
  .el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
