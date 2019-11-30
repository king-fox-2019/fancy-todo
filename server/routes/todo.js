const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middlewares/authentication')

router.use(authentication)

router.post('/',TodoController.create)
router.get('/',TodoController.read)
router.put('/:id',TodoController.update)
router.delete('/:id',TodoController.delete)
router.patch('/complete',TodoController.complete)
router.patch('/uncomplete',TodoController.uncomplete)

module.exports = router