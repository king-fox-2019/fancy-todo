const todoController = require('../controllers/todo')
const routes = require('express').Router()
const { authentication , authorizationTodo } = require('../middlewares/auth')

routes.use(authentication)
routes.get('/', todoController.findAll)
// routes.get('/:title', todoController.findTitle)
routes.post('/', todoController.create)
routes.post('/:id', todoController.createTodosProject)
routes.put('/:id', authorizationTodo, todoController.updatePut)
routes.patch('/:id', authorizationTodo, todoController.updatePatch)
routes.delete('/:id', authorizationTodo, todoController.deleted)

module.exports = routes