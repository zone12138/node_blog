# vue_node

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 服务器启动  node(express) + mongoDB

### 启动node
```
node ./server/index.js
```
or 

### 启动node(热更新) 
```
nodemon ./server/index.js
```
前提：需要下载 nodemon npm包
```
npm install nodemon
```

## 解决跨域

### 前端方面(参考vue.config.js文件)
```
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

```
const express = require('express')

const app = express()

app.use(require('cors')()) // 利用 cors 包去实现跨域
```