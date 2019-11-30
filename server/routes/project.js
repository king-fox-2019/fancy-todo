const router = require('express').Router()
const ProjectController = require('../controllers/project')
const { authentication, projectAuthorAuthorization, memberAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', ProjectController.createProject)
router.get('/', ProjectController.findAllProject)

// owner
router.use('/:id', projectAuthorAuthorization)
router.post('/:id', ProjectController.findOneProject)
router.patch('/:id/invite', ProjectController.inviteMember)//invite member
router.patch('/:id/dismiss/userId', ProjectController.dismissMemberOrLeaveProject)
router.delete('/:id', ProjectController.deleteProject)

// member
router.use('/:id/todos', memberAuthorization)
router.patch('/:id/todos', ProjectController.addProjectTodo)
router.patch('/:id/todos/todoId', ProjectController.updateProjectTodo)
router.delete('/:id/todos/todoId', ProjectController.deleteProjectTodo)

module.exports = router