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
    redirect: '/article/index'
  },
  {
    path: '/article/create',
    name: 'create',
    component: CreateArticle
  },
  {
    path: '/article/index',
    name: 'list',
    component: ListArticle,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/article/modify/:id',
    name: 'edit',
    component: EditArticle
  },
  {
    path: '/article/detail/:id',
    name: 'detail',
    component: ArticleDetail
  },
  {
    path: '/article/echarts',
    name: 'echarts',
    component: ArticleEchart
  }
]

const router = new VueRouter({
  mode: 'history',
  // 生产环境下, base 属性的值需要与 vue.config.js 文件中的 assetsDir 属性的值保持一致, 否则请求的路由页面的资源(如 css, js 文件)会报错(404)
  // base: process.env.NODE_ENV === 'prodution' ? '/article/' : process.env.BABEL_URL,
  base: process.env.BABEL_URL,
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
