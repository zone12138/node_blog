require('../dbConnection/index.js')

const Mongoose = require('mongoose')

const Schema = Mongoose.Schema

const BlogSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  type: {
    type: String
  }
})

const BlogModule = Mongoose.model('blog', BlogSchema)

module.exports = BlogModule
