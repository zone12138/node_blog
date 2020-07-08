# 打包运行时遇到的一些问题

## vue-router history 模式

### 出现的问题
在 vue-router history 模式下, 从某一路由路径页面跳转到另一路由页面路径时, 请求的该路由路径下的组件资源路径报错

### 详细描述
目前发现的问题是, 从某一路由路径页面跳转到另一路由页面路径时，请求资源文件(如 css , js 文件)都会带着多余的前缀 /article 路径;  
即从 localhost:port/article/index 跳转至 localhost:port/article/echarts 时, 请求资源文件(如 css , js 文件) 路径为 localhost:port/article/article/css/xxx.css  
而, 正确的资源路径是 localhost:port/article/css/xxx.css (上述的错误路径多了多余的前缀 /article )

感觉就像是某一路由的 ./ 的相对路径( localhost:port/article/index 的上一层目录即 localhost:port/article )加上另一路由的资源的路径 article/css/xxx.css ,  
构成了错误路径( localhost:port/article/article/css/xxx.css ), 导致请求资源错误

### 解决方法
删掉 path 属性的 '/article' 前缀字段  
(注： 并不晓得是不是最优方法, 尝试以不同方式修改了 vue.config.js 的 outputDir 和 assetsDir 均不见成效, 后使用了这种方法成功了)

原 router/index.js 中配置的路由信息
```
{
    path: '/article/echarts',
    name: 'echarts',
    component: ArticleEchart
}
```

现 router/index.js 中配置的路由信息
```
{
    path: '/echarts',
    name: 'echarts',
    component: ArticleEchart
}
```

## 页面白屏控制台报错

### 出现的问题
html 页面请求外部 app.js 和 chunk-vendors.js 路径有问题

### 解决方法
按环境(生产环境或者开发环境)分配 publicPath 的属性值

原 vue.config.js 文件中 publicPath 的配置
```
publicPath: '/'
```
现 vue.config.js 文件中 publicPath 的配置
```
// 生产环境下, 解决打包后生成的html文件中, 引入的 css 文件和 js 文件路径错误
// 开发环境下, 解决页面刷新后空白, 且控制台报错: Uncaught SyntaxError: Unexpected token <
publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
```