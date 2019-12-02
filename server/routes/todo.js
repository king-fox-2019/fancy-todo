const router = require('express').Router()
const TodoController = require('../controllers/todoCon')
const { todoAuthorization } = require('../middlewares/auth')

router.post('/', TodoController.create)
router.get('/', TodoController.showAllUserTodos)

router.put('/status/:todoId', todoAuthorization, TodoController.doneUndone)
router.get('/:todoId', todoAuthorization, TodoController.showTodo)
router.put('/:todoId', todoAuthorization, TodoController.update)
router.delete('/:todoId', todoAuthorization, TodoController.delete)

module.exports = router