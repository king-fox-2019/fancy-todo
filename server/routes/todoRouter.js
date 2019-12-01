const router = require('express').Router();
const ControllerTodo = require('../controllers/todoC')

router.get('/', ControllerTodo.allTodo)

router.post('/', ControllerTodo.makeOne)

router.get('/:name', ControllerTodo.someTodo)

router.put('/:id', ControllerTodo.update)

router.delete('/:id', ControllerTodo.delete)

router.patch('/', ControllerTodo.done)

module.exports = router