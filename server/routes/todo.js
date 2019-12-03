const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', TodoController.create)
router.get('/', TodoController.findAll)
router.get('/:id', TodoController.findOne)

router.use('/:id', authorization)
router.put('/:id', TodoController.updateField)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router