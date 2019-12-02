if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config()
}

require('./config/mongoose')
const express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    app = express(),
    routes = require('./routes'),
    { errorHandler } = require('./middlewares/errorHandler');

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

module.exports = app
