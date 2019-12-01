const router = require('express').Router()
const ProjectController = require('../controllers/project')
const { authentication, projectAuthorAuthorization, memberAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', ProjectController.createProject)
router.get('/', ProjectController.findAllProject)

// member
router.use('/:id/todos', memberAuthorization)
router.get('/:id', ProjectController.findOneProject)
router.patch('/:id/todos', ProjectController.addProjectTodo)
router.patch('/:id/todos/:todoId', ProjectController.updateProjectTodo)
router.delete('/:id/todos/:todoId', ProjectController.deleteProjectTodo)

// owner
router.use('/:id', projectAuthorAuthorization)
router.patch('/:id', ProjectController.updateProject)
router.patch('/:id/invite', ProjectController.inviteMember)//invite member
router.patch('/:id/dismiss/userId', ProjectController.dismissMemberOrLeaveProject)
router.delete('/:id', ProjectController.deleteProject)



module.exports = router