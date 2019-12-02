'use strict'

const express = require('express')
const todo = express.Router()
const TodoCon = require('../controllers/TodoCon')
const { authenticate } = require('../middlewares/auth')

todo.use(authenticate)

todo.get('/', TodoCon.findAll)
todo.post('/',TodoCon.addTodo)
todo.delete('/:id' ,TodoCon.deleteTodo)
todo.put('/:user' ,TodoCon.updateTodo)
todo.patch('/:user' ,TodoCon.checkTodo)

module.exports = todo