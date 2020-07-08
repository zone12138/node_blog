import Vue from 'vue'
import VueRouter from 'vue-router'
// import CreateArticle from '../views/CreateArticle.vue'
// import ListArticle from '../views/ListArticle.vue'
// import EditArticle from '../views/EditArticle.vue'
// import ArticleDetail from '../views/ArticleDetail.vue'
// import ArticleEchart from '../views/ArticleEcharts.vue'

// 路由懒加载
const CreateArticle = () =>
  import(/* webpackChunkName: "createArticle" */ '../views/CreateArticle.vue')
const ListArticle = () =>
  import(/* webpackChunkName: "listArticle" */ '../views/ListArticle.vue')
const EditArticle = () =>
  import(/* webpackChunkName: "editArticle" */ '../views/EditArticle.vue')
const ArticleDetail = () =>
  import(/* webpackChunkName: "articleDetail" */ '../views/ArticleDetail.vue')
const ArticleEchart = () =>
  import(/* webpackChunkName: "articleEchart" */ '../views/ArticleEcharts.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/index'
  },
  {
    path: '/create',
    name: 'create',
    component: CreateArticle
  },
  {
    path: '/index',
    name: 'list',
    component: ListArticle,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/modify/:id',
    name: 'edit',
    component: EditArticle
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: ArticleDetail
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: ArticleEchart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'prodution' ? '/article/' : process.env.BABEL_URL,
  // base: '/app/',
  routes
})

router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
    location.reload()
    // const targetPath = $router.history.pending.fullPath;
    // $router.replace(targetPath);
  }
})

export default router
