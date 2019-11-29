'use strict'

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3002
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')

mongoose.connect('mongodb://localhost/fancyTodo', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)
app.use(errorHandler)


app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })