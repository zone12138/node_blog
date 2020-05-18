const Mongoose = require('mongoose')

Mongoose.connect('mongodb://localhost/vuenode', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
