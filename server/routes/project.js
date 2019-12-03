const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const { authentication, projectOwnerAuthorization, projectMemberAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', ProjectController.create)
router.get('/', ProjectController.findAll)
router.get('/:id', ProjectController.findOne)

router.patch('/:id', projectOwnerAuthorization, ProjectController.addMember)
router.delete('/:id', projectOwnerAuthorization, ProjectController.deleteProject)

router.use('/:id/todos', projectMemberAuthorization)
router.patch('/:id/todos', projectMemberAuthorization, ProjectController.addTodo)
router.delete('/:id/todos/:todoId', projectMemberAuthorization, ProjectController.deleteTodo)
router.patch('/:id/todos/:todoId', projectMemberAuthorization, ProjectController.updateTodo)
router.patch('/:id/todos/:todoId/status', projectMemberAuthorization, ProjectController.changeTodoStatus)

module.exports = router