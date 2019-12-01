const express = require('express')
const router = express.Router()

const { todoController } = require('../controllers')
const { authenticate, authorized } = require('../middleware/auth')

router.use(authenticate)
router.get('/', todoController.getAllTodos)
router.post('/', todoController.createTodo)

router.use('/:todoId', authorized)
router.delete('/:todoId', todoController.deleteTodo)
router.put('/:todoId', todoController.putTodo)
router.patch('/:todoId', todoController.patchTodo)


module.exports = router
