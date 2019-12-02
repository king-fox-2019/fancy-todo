const express = require("express");
const todo = express.Router();
const todoController = require("../controllers/todoController");
const { authentication, authorization } = require("../middlewares/auth")

todo.use(authentication)
todo.get("/", todoController.showTodos);
todo.post("/", todoController.addTodo);

todo.get("/:todoId", authorization, todoController.showTodo);
todo.put("/:todoId", authorization, todoController.editTodo);
todo.patch("/:todoId", authorization, todoController.editTodoSpecified);
todo.delete("/:todoId", authorization, todoController.deleteTodo);

module.exports = todo;