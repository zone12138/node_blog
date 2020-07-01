import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keepAliveList: ['ArticleList'],
    quillToolbar: [
      ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
      ['blockquote', 'code-block'], // 引用，代码块
      [{
        header: 1
      }, {
        header: 2
      }], // 标题，键值对的形式；1、2表示字体大小
      [{
        list: 'ordered'
      }, {
        list: 'bullet'
      }], // 列表
      [{
        script: 'sub'
      }, {
        script: 'super'
      }], // 上下标
      [{
        indent: '-1'
      }, {
        indent: '+1'
      }], // 缩进
      [{
        direction: 'rtl'
      }], // 文本方向

      [{
        size: ['small', false, 'large', 'huge']
      }], // 字体大小
      [{
        header: [1, 2, 3, 4, 5, 6, false]
      }], // 几级标题

      [{
        color: []
      }, {
        background: []
      }], // 字体颜色，字体背景颜色
      [{
        font: []
      }], // 字体
      [{
        align: []
      }], // 对齐方式

      ['clean'], // 清除字体样式
      ['link', 'image', 'video'] // 超链接、上传图片、上传视频
    ]
  },
  mutations: {
    add (state, name) {
      state.keepAliveList.indexOf(name) < 0 && state.keepAliveList.push(name)
    },
    remove (state, name) {
      state.keepAliveList = state.keepAliveList.filter(item => {
        return item !== name
      })
    },
    clear (state) {
      state.keepAliveList = []
    }
  },
  actions: {
  },
  modules: {
  }
})
