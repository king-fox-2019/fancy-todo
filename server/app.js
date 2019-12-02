if (process.env.NODE_ENV === 'development') require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middleware/error-handler')

mongoose.connect('mongodb://localhost:27017/fancytodo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors())
app.use('/', routes)
app.use(errorHandler)


app.listen(port, () => console.log('Listening on port', port))
