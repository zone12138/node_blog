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
      <el-table-column prop="title" label="标题" width="140"> </el-table-column>
      <el-table-column prop="body" label="内容" width="220"> </el-table-column>
      <el-table-column prop="type" label="类别" width="80"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
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
  data () {
    return {
      articlesData: [],
      select: 'title',
      input: ''
    }
  },
  methods: {
    fetch () {
      this.$http.get('article').then(res => {
        this.articlesData = res.data
        // console.log(res.data + 'hello')
      })
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
        this.$http.post('article/search', obj).then(res => {
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
