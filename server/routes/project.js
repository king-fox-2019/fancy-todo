const projectController = require('../controllers/project')
const todoController = require('../controllers/todo')
const routes = require('express').Router()
const { authentication , authorizationProject, authorizationTodo } = require('../middlewares/auth')

routes.use(authentication)
routes.get('/', projectController.findAll)
routes.post('/', projectController.create)
routes.get('/members', projectController.findInMember)
routes.put('/todo/:id', todoController.updateTodosProject)
routes.delete('/todo/:id', todoController.deleteTodosProject)
routes.get('/cancel/:id',projectController.deleteInvite)
routes.get('/:id', projectController.findAllTodoProject)
routes.post('/:id', projectController.invite)
routes.put('/:id', authorizationTodo, projectController.updateTodosProject)
routes.patch('/:id', authorizationProject, projectController.updateName)
routes.delete('/:id',authorizationProject, projectController.deleted)

module.exports = routes