const express = require('express')
const route = express.Router()
const user = require('./user')
const todo = require('./todo')


route.use('/', user)
route.use('/todo', todo)

module.exports = route