<template>
  <el-container style="height: 100vh; border: 1px solid #eee;" class="blog-bg">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :router="true" :default-active="this.$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>文章管理</template>
          <el-menu-item-group>
            <el-menu-item index="/index">文章列表</el-menu-item>
            <el-menu-item index="/create">创建文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index='2'>
          <template slot="title"><i class="el-icon-menu"></i>文章统计</template>
          <el-menu-item-group>
            <el-menu-item index="/echarts">echarts图表分析</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <img src="./assets/blog.png" alt="">
        <p>blog</p>
      </el-header>

      <!-- 首页内容 -->
      <el-main>
        <!-- 动态实现页面缓存 -->
        <keep-alive :include="$store.state.keepAliveList">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
html body {
  padding: 0;
  margin: 0;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.echarts{
  width: 100%;
}

.el-main {
  display: flex !important;
}

.el-main>div{
  width: 100%;
}
/* .blog-bg{
  background-image: url(./assets/bg.jpg);
  background-size: 100% 100%;
} */

</style>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
