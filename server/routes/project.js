const router = require('express').Router()
const MemberRouter = require('./member')
const TaskRouter = require('./task')
const ProjectController = require('../controllers/project')
const Authenticate = require('../middlewares/authenticate')
const Authorization = require('../middlewares/authorizationProject')

// get all project
router.get('/', Authenticate, ProjectController.getAllProject)

// get user project
router.get('/user', Authenticate, ProjectController.getUserProject)

// get one project
router.get('/:id', Authenticate, ProjectController.getOneProject)

// create project
router.post('/', Authenticate, ProjectController.createProject)

// edit project
router.put('/:id', Authenticate, Authorization, ProjectController.editProject)

// delete project
router.delete('/:id', Authenticate, Authorization, ProjectController.deleteProject)

// routing member
router.use('/member', MemberRouter)

// routing task
router.use('/task', TaskRouter)

module.exports = router