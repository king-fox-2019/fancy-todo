const user = require('express').Router()
const { TodoController } = require('../controllers')

user.get('/todos', TodoController.getAllUserTodos)

module.exports = user
