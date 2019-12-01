if (process.env.NODE_ENV === 'development') require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

mongoose.connect('mongodb://localhost:27017/fancytodo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use('/', routes)
app.use(function (err, request, response, next) {
  response.status(500).json(err)
})


app.listen(port, () => console.log('Listening on port', port))
