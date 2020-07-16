# 打包运行时遇到的一些问题

## vue-router history 模式

### 出现的问题

在 vue-router history 模式下, 从某一路由路径页面跳转到另一路由页面路径时, 请求的该路由路径下的组件资源路径报错

### 详细描述

目前发现的问题是, 从某一路由路径页面跳转到另一路由页面路径时，请求资源文件(如 css , js 文件)都会带着多余的前缀 /article 路径;  
即从 localhost:port/article/index 跳转至 localhost:port/article/echarts 时, 请求资源文件(如 css , js 文件) 路径为 localhost:port/article/css/xxx.css  
而, 正确的资源路径是 localhost:port/css/xxx.css (上述的错误路径多了多余的前缀 /article )

感觉就像是某一路由的 ./ 的相对路径 -- 也就是 vue.config.js 文件中的 publicPath 属性值( localhost:port/article/index 的上一层目录即 localhost:port/article )加上另一路由的资源的路径 css/xxx.css ,  
构成了错误路径( localhost:port/article/css/xxx.css ), 导致请求资源错误

### 解决方法

1. 删掉 path 属性的 '/article' 前缀字段, 并将 vue 组件中对应的路由路径进行检查, 确保是否相应的删除和是否保持一致, 即要与 vue.config.js 文件中的 publicPath 属性进行相对位置的匹配(也就是 localhost:post/echarts 的相对于 publicPath 属性值 './' 的地址为 localhost:post/, 再加上资源位置 css/xxx.css 构成了正确的资源请求路径)

    <font color= #ff0000 >缺点：路由配置只能配置一层, 如果是嵌套路径或者多个 '/' 组成的路径(例如详情页面)将会无效, 因此不推荐</font>

    原 router/index.js 中配置的路由信息

    ``` JavaScript
    {
        path: '/article/echarts',
        name: 'echarts',
        component: ArticleEchart
    }
    ```

    vue.config.js 中的配置

    ``` javaScript
        module.exports = {
            publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
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

2. 如果想要设置 vue.config.js 中的 assetsDir 属性(即将 js、css 文件夹都放进该属性值命名的文件夹中), 需要设置路由的 base 属性, 操作如下：

    <font color= #ff0000 >缺点：路由配置只能配置一层, 如果是嵌套路径或者多个'/'的路径将会无效,与第一种无多大差别且麻烦, 因此也不推荐</font>

    删除'/article', 现 router/index.js 中配置的路由信息

    ``` JavaScript
        {
            path: '/echarts',
            name: 'echarts',
            component: ArticleEchart
        }
    ```

    vue.config.js 中的配置

    ``` javaScript
        module.exports = {
        // 生产环境下, 解决打包后生成的html文件中, 引入的 css 文件和 js 文件路径错误
        // 开发环境下, 解决页面刷新后空白, 且控制台报错: Uncaught SyntaxError: Unexpected token <
        publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
        outputDir: 'dist',
        // js、css 文件夹打包后放置的位置
        assetsDir: 'article'
        }
    ```

    原 src/router/index.js

    ``` javaScript
        const router = new VueRouter({
            mode: 'history',
            base:  process.env.BABEL_URL,
            routes
        })
    ```

    现 src/router/index.js

    ``` javaScript
        const router = new VueRouter({
            mode: 'history',
            // 生产环境下, base 属性的值需要与 vue.config.js 文件中的 assetsDir 属性的值保持一致, 否则请求的路由页面的资源(如 css, js 文件)会报错(404)
            base: process.env.NODE_ENV === 'prodution' ? '/article/' : process.env.BABEL_URL,
            routes
        })
    ```

3. 修改 vue.config.js 中的 publicPath 属性的值(推荐方法)

    原 vue.config.js 中的配置

    ``` javaScript
        module.exports = {
            publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
            outputDir: 'dist',
            // js、css 文件夹打包后放置的位置
            assetsDir: 'article'
        }
    ```

    现 vue.config.js 中的配置

    ``` javaScript
        module.exports = {
            // 生产环境下, 解决打包后生成的html文件中, 引入的 css 文件和 js 文件路径错误(这里不能直接通过html文件打开去校验打包成果, 需要通过将文件夹放到服务器中去验证)
            // 在服务器当中请求的资源位置是相对于浏览器地址栏路径的, 也就是说请求的资源地址前缀为服务器的地址, 如果资源文件夹的路径更改(也就是 assetsDir 属性值变化, 这里的请求路径要做出相对应的修改)
            // 直接将生成的 html 文件在浏览器中打开的话会出现问题, 请求的资源位置一样是根据浏览器地址栏路径的, 也就是相对于 html 文件在用户电脑本地上的路径进行相应的资源地址请求(在这里请求的位置是 c 盘下的直接子目录 -- 然而资源并没有打包在 c盘 根目录下)

            // 开发环境下, 解决页面刷新后空白, 且控制台报错: Uncaught SyntaxError: Unexpected token <
            publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
            // 打包的文件夹默认是 dist
            outputDir: 'dist',
            // 打包的 js、css 文件夹所放置的位置, 相对于 outputDir 的位置
            assetsDir: './',
        }
    ```

    修改了 publicPath 值为 '/' , 也就是请求资源位置路径的前缀为服务器地址 -- localhost:port/ , 如今的请求资源路径是 服务器地址(这里是 localhost:post/ ) + 资源位置(这里是 css/xxx.css )构成正确的请求资源路径

    <font color= #ff0000 >注意：如果 vue.config.js 中的 assetsDir 的值变化了, src/router/index.js 文件也要进行相对应的修改</font>

    <font color= #00ff00 >例子: assetsDir 的值更改为 'article' , src/router/index.js 文件中路由实例的 base 属性值修改为 '/article/'</font>

    ``` javaScript
        module.exports = {
            publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
            // 打包的文件夹默认是 dist
            outputDir: 'dist',
            // 打包的 js、css 文件夹所放置的位置, 相对于 outputDir 的位置
            assetsDir: 'article',
        }
    ```

    原 src/router/index.js

    ``` javaScript
        const router = new VueRouter({
            mode: 'history',
            base:  process.env.BABEL_URL,
            routes
        })
    ```

    现 src/router/index.js

    ``` javaScript
        const router = new VueRouter({
            mode: 'history',
            // 生产环境下, base 属性的值需要与 vue.config.js 文件中的 assetsDir 属性的值保持一致, 否则请求的路由页面的资源(如 css, js 文件)会报错(404)
            base: process.env.NODE_ENV === 'prodution' ? '/article/' : process.env.BABEL_URL,
            routes
        })
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
publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
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
