module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // 按需引入 element 组件的相关配置
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
