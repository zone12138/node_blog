module.exports = {
  // 生产环境下, 解决打包后生成的html文件中, 引入的 css 文件和 js 文件路径错误
  // 开发环境下, 解决页面刷新后空白, 且控制台报错: Uncaught SyntaxError: Unexpected token <
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'article',
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // entry找到默认的打包入口，调用clear则是删除默认的打包入口
      // add添加新的打包入口
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')

      // 使用externals设置排除项
      config.set('externals', {
        // key 为引入的 npm 包名, value 为暴露在全局的属性(可通过浏览器输出 window 进行查看相应的相似的属性字段)
        vue: 'Vue',
        // 'element-ui': 'ELEMENT', // 这里的 ELEMENT 无效(虽然打包文件体积小了 -- 要在完整引入才生效, 按需引入不会生效), 打包时还是会将其打包进去, 现在只能在 main-prod.js 文件中注释掉 plugins/element.js 文件的引入
        // 'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        // echarts: 'echarts', // 这里的 echarts 无效, 打包时还是会将其打包进去, 现在只能在 main-prod.js 文件中注释掉 plugins/echarts.js 文件的引入
        'vue-echarts': 'VueECharts',
        'echarts-gl': 'echarts-gl',
        'vue-quill-editor': 'VueQuillEditor',
        moment: 'moment'
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main.js')
    })
  },
  // 使用 echarts 相关的配置
  transpileDependencies: ['vue-echarts', 'resize-detector'],
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
