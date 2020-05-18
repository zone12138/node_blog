const BlogModule = require('./mongoose/modules/blogModule.js')

const bodyParser = require('body-parser')

const express = require('express')

const app = express()

// 允许跨域
app.use(require('cors')())

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
// parse application/json
app.use(bodyParser.json())

app.get('/', async (req, res) => res.send('restful page'))

// 查询所有文章
app.get('/api/article', async (req, res) => {
//   await 相当于 Promise.resolve().then() 的一个语法糖 后面紧跟的函数返回值将作为 Promise.resolve().then() 中 then 的参数 res
// 所以这里赋值 articles articles 的值就是上一步讨论的 res
  const articles = await BlogModule.find()
  res.send(articles)
})

// 文章详情
app.get('/api/article/:id', async (req, res) => {
  const article = await BlogModule.findById(req.params.id)
  res.send(article)
})

// 查询文章 -- 模糊查询
app.post('/api/article/search', async (req, res) => {
  // 正则只能在后端处理, 前端处理后传到后端的参数会发生改变(变成一个空对象{})
  var obj = {}
  obj[req.body.select] = new RegExp(req.body.input)
  const search = await BlogModule.find(obj)
  res.send(search)
})

// 修改文章
app.put('/api/article/:id', async (req, res) => {
  const article = await BlogModule.findByIdAndUpdate(req.params.id, req.body)
  res.send(article)
})

// 新增文章
app.post('/api/article', async (req, res) => {
  const articles = await BlogModule.create(req.body)
  res.send(articles)
})

// 删除文章(接受参数)
app.delete('/api/article/:id', async (req, res) => {
  await BlogModule.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})

app.listen(3000, () => console.log('http://localhost:3000/'))
