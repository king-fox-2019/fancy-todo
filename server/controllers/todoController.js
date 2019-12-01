const { Todo } = require("../models")
const { ObjectId } = require("mongodb");

class todoController {
    static addTodo(req, res, next) {
      console.log(req.decoded, '<<<<<<<<')
      const { name, description, status, due_date } = req.body;
      const user_id  = req.decoded._id;
      console.log(user_id, 'loh kok')
      Todo.create({ name, description, status, due_date, user_id })
        .then(todo => {
          res.status(200).json(todo);
        }).catch(next)
    }
    
    static showTodos(req, res, next) {
      console.log(req.decoded._id)
      Todo.find({ user_id: req.decoded._id })
        .then(todos => {
          console.log(todos)
          res.status(200).json(todos);
        }).catch(next)
    }

    static showTodo(req, res, next) {
      Todo.findById({ _id: ObjectId(req.params.todoId) })
        .then(todo => {
          res.status(200).json(todo);
        }).catch(next);
    }

    static editTodo(req, res, next) {
      const todoId = req.params.todoId;
      const { name, description, status, due_date } = req.body;
      Todo.findByIdAndUpdate(todoId, { name, description, status, due_date })
        .then(response => {
          res.status(200).json({ message: 'Updated' })
        }).catch(next);
    }

    static editTodoSpecified(req, res, next) {
      const update = {};
      const todoId = req.params.todoId;
      const { name, description, status, due_date } = req.body;
      if (name) update.name = name;
      if (description) update.description = description;
      if (status) update.status = status;
      if (due_date) update.due_date = due_date;
      Todo.findByIdAndUpdate(todoId, update)
        .then(todo => {
          res.status(200).json({ message: 'Updated' })
        }).catch(next);

    }

    static deleteTodo(req, res, next) {
      const todoId = req.params.todoId;
      console.log(todoId, '||||||')
      Todo.deleteOne({ _id: todoId })
        .then(response => {
          console.log(response, '<<<')
          res.status(200).json({ message: 'Deleted' })
        })
        .catch(next)
    }

}

module.exports = todoController;