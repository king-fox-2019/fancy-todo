const user = require('express').Router()
const { TodoController, GroupController } = require('../controllers')

user.get('/todos', TodoController.getAllUserTodos)
user.get('/groups', GroupController.getAllUserGroups)

module.exports = user
