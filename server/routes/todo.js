const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.post('/',TodoController.create)
router.get('/',TodoController.read)
router.put('/:id',authorization,TodoController.update)
router.delete('/:id',authorization,TodoController.delete)

module.exports = router