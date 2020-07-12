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

删掉 path 属性的 '/article' 前缀字段, 并将 vue 组件中对应的路由路径进行检查, 确保是否相应的删除和是否保持一致  
(注： 并不晓得是不是最优方法, 尝试以不同方式修改了 vue.config.js 的 outputDir 和 assetsDir 均不见成效, 后使用了这种方法成功了)

原 router/index.js 中配置的路由信息

``` JavaScript
{
    path: '/article/echarts',
    name: 'echarts',
    component: ArticleEchart
}
```

现 router/index.js 中配置的路由信息

``` JavaScript
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

``` JavaScript
publicPath: '/'
```

现 vue.config.js 文件中 publicPath 的配置

``` JavaScript
// 生产环境下, 解决打包后生成的html文件中, 引入的 css 文件和 js 文件路径错误
// 开发环境下, 解决页面刷新后空白, 且控制台报错: Uncaught SyntaxError: Unexpected token <
publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
```

## 打包后 chunk-vendors.js 文件过大的问题

### 出现的问题

1. 第三方插件全部都打包到 chunk-vendors.js 文件中, 导致该文件过大

2. element-ui 组件使用 cdn 和 vue.config.js 配置的 externals 还是无法将其不打包到 chunk-vendors.js 文件中

3. echarts 组件使用 cdn 和 vue.config.js 配置的 externals 还是无法将其不打包到 chunk-vendors.js 文件中

### 解决方法

1. 使用 cdn 和 vue.config.js 配置的 externals 属性, 将这些第三方插件忽略, 不将其打包进 chunk-vendors.js 文件中

    在 public/index.html 文件中使用 cdn(注意：版本号要与 package.json 文件中的版本号对应)

    ``` HTML
    <!-- Vue -->
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <!-- vuex -->
    <script src="https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js"></script>
    <!-- element-ui -->
    <link href="https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/theme-chalk/index.css" rel="stylesheet">
    <script src="https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/index.js"></script>
    <!-- quill-editor -->
    <link href="https://cdn.bootcdn.net/ajax/libs/quill/1.3.7/quill.bubble.min.css" rel="stylesheet">
    <link href="https://cdn.bootcdn.net/ajax/libs/quill/1.3.7/quill.core.min.css" rel="stylesheet">
    <link href="https://cdn.bootcdn.net/ajax/libs/quill/1.3.7/quill.snow.min.css" rel="stylesheet">
    <script src="https://cdn.bootcdn.net/ajax/libs/quill/1.3.7/quill.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.6/dist/vue-quill-editor.min.js"></script>
    <!-- axios -->
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js"></script>
    <!-- echarts -->
    <script src="https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue-echarts/4.1.0/vue-echarts.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/echarts-gl/1.1.2/echarts-gl.min.js"></script>
    <!-- moment -->
    <script src="https://cdn.jsdelivr.net/npm/moment@2.27.0/moment.min.js"></script>
    ```

   在 vue.config.js 文件中配置 externals 属性

    ``` javaScript
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
                // 'element-ui': 'ELEMENT', // 这里的 ELEMENT 无效(虽然打包文件体积小了 -- 要在完整引入才生效, 按需引入不会生效), 打包时还是会将其打包进去, 解决办法为: 将 plugins/element.js 文件中 import 引入 css 的那行代码注释掉(该方法在 "按需引入" 方式下不起效)
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
    }
    ```

2. element-ui 打包(如果 element-ui 是以 "按需引入" 方式，则无效)
    + 在 vue.config.js 文件中的 externals 属性中配置

    ``` javaScript
        externals: {
            'element-ui': 'ELEMENT'
        }
    ```

    + 在 plugins/element.js 文件中注释掉通过 import 引入 css 的语句

    ``` javaScript
        import Vue from 'vue'
        // 完整引入 element
        import Element from 'element-ui'
        // 打包时需要注释, 否则 chunk-vendors.js 文件还是会将 element-ui 打包进去
        // import 'element-ui/lib/theme-chalk/index.css'
        Vue.use(Element)
    ```

3. echarts 打包

    + 在 vue.config.js 文件中的 externals 属性中配置

    ``` javaScript
        externals: {
            echarts: 'echarts'
        }
    ```

    + 修改 plugins/echarts.js 文件

    ``` JavaScript
        import Vue from 'vue'
        import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
        // 需要安装依赖：npm install vue-echarts echarts --save

        // 手动引入 ECharts 各模块来减小打包体积 -- 此为官网推荐写法(但是不利于使用 cdn 配合 externals 属性的打包方式)
        // import 'echarts/lib/chart/bar'
        // import 'echarts/lib/component/tooltip'

        // 将上面的官网推荐写法注释掉, 替换为下面的写法
        import 'echarts'

        // 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
        // 以 ECharts-GL 为例：
        // 需要安装依赖：npm install --save echarts-gl，并添加如下引用
        import 'echarts-gl'

        // 注册组件后即可使用 (全局注册)
        Vue.component('v-chart', ECharts)
    ```
