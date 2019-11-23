const todos = require('express').Router()
const { TodoController } = require('../controllers')

todos.post('/', TodoController.createTodo)

module.exports = todos
