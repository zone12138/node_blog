import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keepAliveList: ['ArticleList']
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
