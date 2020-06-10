module.exports = {
  devServer: {
    port: 1112,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 代理地址，这里设置的地址会代替axios中设置的baseURL 这里在 main.js 文件中设置了 axios 的 baseURL 为 '/api' 刚好匹配上
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
