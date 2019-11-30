const express = require("express");
const todo = express.Router();
const todoController = require("../controllers/todoController");

todo.post('/', todoController.addTodo);
todo.get('/', todoController.showTodos);
todo.get('/:todoId', todoController.showTodo);
todo.put('/:todoId', todoController.editTodo);
todo.patch('/:todoId', todoController.editTodoSpecified);
todo.delete('/:todoId', todoController.deleteTodo);

module.exports = todo;