const router = require('express').Router();
const ProjectController = require('../controllers/project')
const TodoController = require('../controllers/todo')
const { authentication, ownerProject, memberProject } = require('../middlewares/auth')

router.use(authentication)
router.post('/', ProjectController.create)
router.get('/alluser', ProjectController.allUser)
router.get('/', ProjectController.findAll)
router.get('/:projectId', ProjectController.findOne)
router.delete('/:projectId', ownerProject, ProjectController.deleteProject)
router.delete('/:projectId/:memberId', ownerProject, ProjectController.deleteMember)
router.patch('/invite/:projectId', ownerProject, ProjectController.inviteMember)
router.patch('/accept/:projectId', ProjectController.acceptProject)
router.patch('/decline/:projectId', ProjectController.declineProject)


router.use('/todo/:projectId/:id', memberProject)
router.get('/todo/:projectId', ProjectController.findTodoProject)
router.post('/todo/:projectId', TodoController.addTask)
router.patch('/todo/:projectId/:id', TodoController.updateField)
router.delete('/todo/:projectId/:id', TodoController.delete)



module.exports = router