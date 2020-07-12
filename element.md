# 使用 element-ui 时遇到的问题

## 按需引入和全部引入切换的问题

### 从按需引入更改为全部引入

1. 删除 babel-plugin-component 插件

    ``` shell
        npm uninstall babel-plugin-component
    ```

2. 注释掉 babel.config.js 中配置按需引入的代码

    ``` javaScript
        module.exports = {
            presets: ['@vue/cli-plugin-babel/preset']
            // 按需引入 element 组件的相关配置
            /* plugins: [
                [
                'component',
                {
                    libraryName: 'element-ui',
                    styleLibraryName: 'theme-chalk'
                }
                ]
            ] */
        }
    ```

3. 在 plugins/element.js 文件中将按需引入的代码更改为全部引入

    ``` JavaScript
        import Vue from 'vue'
        // 完整引入 element
        import Element from 'element-ui'
        import 'element-ui/lib/theme-chalk/index.css'
        Vue.use(Element)
        // 按需引入 element 需要配置 babel.config.js 文件
        /*import {
            Menu,
            Submenu,
            MenuItem,
            MenuItemGroup,
            Input,
            Container,
            Header,
            Aside,
            Main,
            Select,
            Option,
            Button,
            ButtonGroup,
            Table,
            TableColumn,
            Form,
            FormItem,
            Radio,
            RadioGroup,
            Message,
            MessageBox
        } from 'element-ui'

        Vue.use(Menu)
        Vue.use(Submenu)
        Vue.use(MenuItem)
        Vue.use(MenuItemGroup)
        Vue.use(Input)
        Vue.use(Container)
        Vue.use(Header)
        Vue.use(Aside)
        Vue.use(Main)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Button)
        Vue.use(ButtonGroup)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Radio)
        Vue.use(RadioGroup)

        Vue.prototype.$message = Message
        Vue.prototype.$msgbox = MessageBox
        Vue.prototype.$alert = MessageBox.alert
        Vue.prototype.$confirm = MessageBox.confirm
        Vue.prototype.$prompt = MessageBox.prompt
        */
    ```

### 从全部引入更改为按需引入

+ 将上面的步骤反向操作即可[参考按需引入更改为全部引入](#从按需引入更改为全部引入)

## 开发环境下, 控制台报错 TypeError: Cannot read property '$options' of undefined 或者 Unknown custom element: 'el-container' - did you register the component correctly? For recursive components, make sure to provide the "name" option

### 出现的问题

+ 第一个报错信息是因为同时使用 import 方式和 public/index.html 页面通过 cdn 引入 vue 和 element-ui, 而没有在 vue.config.js 文件中配置 externals 属性
+ 通过 cdn 方式引入 vue 和 element-ui 时, 需要先引入 vue 后引入 element-ui, 因为 element-ui 依赖 vue
+ 第二个报错信息是因为在 vue-cli 中仅在 public/index.html 页面通过 cdn 引入 vue 和 element-ui 而没有通过 Vue.use(Element) 这种方式去使用 element-ui

### 解决方法

+ 在 vue.config.js 文件中配置开发环境下的 externals 属性

    ``` javaScript
        chainWebpack: config => {
            // 使用externals设置排除项
            config.set('externals', {
            // key 为引入的 npm 包名, value 为暴露在全局的属性(可通过浏览器输出 window 进行查看相应的相似的属性字段)
            vue: 'Vue',
            'element-ui': 'ELEMENT'
            })
        }
    ```
