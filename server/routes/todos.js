const router = require('express').Router()
const ControllerTodo = require('../controllers/todo')
const authorizeTodo = require('../middlewares/authorizeTodo')

router.get('/', ControllerTodo.getAll)

router.post('/:projectId?', ControllerTodo.add) 

router.get('/:id', authorizeTodo, ControllerTodo.getOne)

router.delete('/:id', authorizeTodo, ControllerTodo.delete)

router.put('/:id', authorizeTodo, ControllerTodo.update)

router.patch('/:id', authorizeTodo, ControllerTodo.complete)

router.patch('/:id/important', authorizeTodo, ControllerTodo.markImportant)


module.exports = router