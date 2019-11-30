if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

// use database
require('./config/mongoose')

// require modules
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

// make the server
const app = express()

// using middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan('dev'))

// use routes
app.use(routes)

// errorHandler
app.use(errorHandler)


module.exports = app