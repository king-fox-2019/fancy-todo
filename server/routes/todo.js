const router = require('express').Router()
const TodoController = require('../controllers/Todo')
const { authenticate, authorize } = require('../middlewares/auth')

router.use(authenticate)
router.get('/', TodoController.all)
router.post('/', TodoController.create)
router.delete('/:id', authorize, TodoController.destroy)
router.patch('/:id/done', authorize, TodoController.done)

module.exports = router