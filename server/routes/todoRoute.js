const express = require('express')
const router = express.Router()
const todoController = require('../controllers/Todo')
const { checkOwner } = require('../middleware/authorization')


router.get('/', todoController.getTodos)
router.post('/', todoController.addTodo)
router.delete('/:id', checkOwner, todoController.deleteTodo)
router.patch('/:id', checkOwner, todoController.updateTodo)

module.exports = router