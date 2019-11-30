const express = require('express')
const router = express.Router()

const { todoController } = require('../controllers')


router.get('/', todoController.getAllTodos)
router.post('/', todoController.createTodo)
router.delete('/:todoId', todoController.deleteTodo)
router.put('/:todoId', todoController.putTodo)
router.patch('/:todoId', todoController.patchTodo)


module.exports = router
