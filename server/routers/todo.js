const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const {authorization} = require('../middlewares/auth')

router.post('/', TodoController.createTodo)
router.get('/', TodoController.todoList)
router.patch('/:id', authorization, TodoController.updateTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router