const router = require('express').Router()
const TodoController = require('../controllers/todoCon')
const ProjectController = require('../controllers/projectCon')
const { projectAuthorization, adminAuthorization } = require('../middlewares/auth')

router.post('/', ProjectController.create)
router.get('/', ProjectController.showAllUserProjects)

router.get('/member', ProjectController.showInvitation)
router.put('/member/invite/:projectId', projectAuthorization, ProjectController.inviteMember)
router.get('/member/invitation', ProjectController.showInvitation)
router.put('/member/approve/:projectId', ProjectController.approveInvitation)
router.put('/member/decline/:projectId', ProjectController.declineInvitation)
router.put('/member/left/:projectId', projectAuthorization, ProjectController.left)

router.post('/todo/:projectId', projectAuthorization, TodoController.createTodoProject)
router.get('/todos/:projectId', projectAuthorization, TodoController.showAllProjectTodos)
router.get('/todo/:projectId/:todoId', projectAuthorization, TodoController.showTodo)
router.put('/status/:projectId/:todoId', projectAuthorization, TodoController.doneUndone)
router.put('/:projectId/:todoId', projectAuthorization, TodoController.update)
router.delete('/:projectId/:todoId', projectAuthorization, TodoController.delete)

router.get('/:projectId', projectAuthorization, ProjectController.showOne)
router.put('/:projectId', adminAuthorization, ProjectController.update)
router.delete('/:projectId', adminAuthorization, ProjectController.delete)

module.exports = router

