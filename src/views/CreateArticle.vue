<template>
  <el-form
    @submit.native.prevent
    ref="form"
    :model="article"
    label-width="80px"
  >
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <!-- <el-form-item label="文章内容">
      <el-input
        :autosize="true"
        type="textarea"
        v-model="article.body"
      ></el-input>
    </el-form-item> -->
    <quill-editor
      v-model="article.body"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>

    <el-form-item label="文章类别">
      <el-radio-group v-model="article.type">
        <el-radio label="测试"></el-radio>
        <el-radio label="随笔"></el-radio>
        <el-radio label="前端基础知识"></el-radio>
        <el-radio label="Vue项目"></el-radio>
        <el-radio label="Webpack"></el-radio>
        <el-radio label="MongoDB"></el-radio>
        <el-radio label="Node.js"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit" @click="saveArticle"
        >立即创建</el-button
      >
      <el-button @click="cancleOperation">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from 'moment'
// import { mapMutations } from '../store/index.js'

export default {
  data () {
    return {
      article: {
        type: '测试'
      },
      editorOption: {
        modules: {
          toolbar: this.$store.state.quillToolbar
        },
        theme: 'snow'
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady (editor) {
      // 准备编辑器
    },
    onEditorBlur () {
      // 失去焦点事件
    },
    onEditorFocus () {
      // 获得焦点事件
    },
    onEditorChange () {
      // 内容改变事件
    },
    saveArticle () {
      this.article.dateTime = moment().format('YYYY-MM-DD HH:mm')
      this.$http.post('article', this.article).then(res => {
        this.$message({
          message: '文章创建成功',
          type: 'success'
        })
        this.$store.commit('clear')
        this.$router.push('/article/index')
      })
    },
    cancleOperation () {
      // 取消创建时, 应当返回文章列表页面, 而不是依据历史记录返回上一步
      this.$router.push('/article/index')
      // history.go(-1)
    }
  }
}
</script>

<style scoped>
  .el-form, .quill-editor{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
