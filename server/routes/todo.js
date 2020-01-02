const routes = require('express').Router()
const TodoController = require('../controllers/todoCon')
const { authenticate , authorize } = require('../middleware/auth')

routes.use(authenticate)

routes.get('/:user', authorize ,TodoController.TodoPerson)
routes.post('/:user', authorize ,TodoController.addTodo)
routes.delete('/:id', authorize ,TodoController.deleteTodo)
routes.put('/:id', authorize ,TodoController.updateTodo)
routes.patch('/:id', authorize ,TodoController.checkTodo)

module.exports = routes