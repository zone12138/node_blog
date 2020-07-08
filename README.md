# vue_node

## Project setup

``` shell
npm install
```

### Compiles and hot-reloads for development

``` shell
npm run serve
```

### Compiles and minifies for production

``` shell
npm run build
```

### Lints and fixes files

``` shell
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 服务器启动

Node.js(Express) + MongoDB  
[MongoDB官网](https://www.mongodb.com/)

### 启动node

``` shell
node ./server/index.js
```

or

### 启动node(热更新)

``` shell
nodemon ./server/index.js
```

前提：需要下载 nodemon npm包

``` shell
npm install nodemon
```

## 解决跨域

### 前端方面(参考vue.config.js文件) 注：仅解决开发环境下的跨域问题, 生产环境下没有效果

``` JavaScript
// main.js 文件中设置 axios 的 baseURL 为 '/api', 让其匹配 vue.config.js 文件中 devServer.proxy 对象的属性
// 创建一个接口和地址,定义到Vue的原型上
Vue.prototype.$http = axios.create({
  baseURL: '/api'
})
```

``` JavaScript
module.exports = {
  devServer: {
    port: 1112,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 代理地址，这里设置的地址会代替 axios 中设置的baseURL 这里在 src/main.js 文件中设置了 axios 的 baseURL 为 '/api' 刚好匹配上
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        // ws: true, // proxy websockets
        // pathRewrite方法重写url
        pathRewrite: {
          '^/api': '/api'
          // pathRewrite: {'^/api': '/'} 如：请求路径为 /article 时, 重写之后url为 http://localhost:3000/article
          // pathRewrite: {'^/api': '/api'} 如：请求路径为 /article 时, 重写之后url为 http://localhost:3000/api/article
        }
      }
    }
  }
}
```

### 后端方面(参考server/index.js文件)

``` node.js
const express = require('express')

const app = express()

app.use(require('cors')()) // 利用 cors 包去实现跨域
```

## 打包后项目的查看

### 运行 npm run build

将项目打包到根目录下的 dist(默认) 文件夹中

``` shell
npm run build
```

### 全局安装 http-server

``` shell
npm install http-server -g
```

### 打开打包好的目录(这里是 dist 文件夹)

在文件夹地址栏处输入 cmd 回车, 进入shell

``` shell
http-server -c-1
```

运行成功后, 复制地址到浏览器中打开即可查看打包后的项目的内容(注意：记得启动后台接口服务, 请参考[服务器启动](#服务器启动))
