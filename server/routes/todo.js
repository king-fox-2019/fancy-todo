const routes = require('express').Router()
const TodoController = require('../controllers/todoCon')
const { authenticate , authorize } = require('../middleware/auth')

routes.use(authenticate)

routes.get('/:user', authorize ,TodoController.TodoPerson)
routes.post('/:user', authorize ,TodoController.addTodo)
routes.delete('/:user', authorize ,TodoController.deleteTodo)
routes.put('/:user', authorize ,TodoController.updateTodo)
routes.patch('/:user', authorize ,TodoController.checkTodo)

module.exports = routes