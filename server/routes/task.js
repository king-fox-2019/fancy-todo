const router = require('express').Router()
const TaskController = require('../controllers/task')
const Authenticate = require('../middlewares/authenticate')
const Authorization = require('../middlewares/authorizationProject')
const AuthorizationTask = require('../middlewares/authorizationTask')

// create task
router.post('/:id', Authenticate, TaskController.createTask)

// get all task for project
router.get('/:id', Authenticate, TaskController.getAllTask)

// get one task
router.get('/:id/detail', Authenticate, AuthorizationTask,TaskController.getOneTask)

// update status task
router.put('/:id', Authenticate, AuthorizationTask, TaskController.updateStatusTask)

//edit task
router.patch('/:id', Authenticate, AuthorizationTask, TaskController.editTask)

// delete task
router.delete('/:id', Authenticate, AuthorizationTask, TaskController.deleteTask)

module.exports = router