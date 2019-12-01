if (process.env.NODE_ENV = 'development') {
    require('dotenv').config()
}
require('./config/mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)
app.use(errorHandler)

module.exports = app