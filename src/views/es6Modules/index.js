var obj = {
  name: 'xiaoming'
}
var sex = 'boy'

// obj 在被引入后, 直接改变 name 属性, 会导致其他引入该文件中 obj 变量的文件中的 obj.name 属性发生变化
// 也就是 es6 的 Modules 引入的是变量的值的引用(对象类型的变量)
export {
  obj as outObj,
  sex as outSex
}
