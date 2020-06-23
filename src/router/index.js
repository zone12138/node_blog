import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateArticle from '../views/CreateArticle.vue'
import ListArticle from '../views/ListArticle.vue'
import EditArticle from '../views/EditArticle.vue'
import ArticleDetail from '../views/ArticleDetail.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
