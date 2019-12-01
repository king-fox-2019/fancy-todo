const routes = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authenticate, authorize } = require('../middlewares/auth')

routes.use(authenticate)
routes.post('/', TodoController.create)

routes.use(authorize)
routes.get('/', TodoController.showAll)
routes.get('/:id', TodoController.showOne)
routes.delete('/:id', TodoController.delete)
routes.patch('/:id', TodoController.edit)

module.exports = routes