const router = require('express').Router()
const TaskController = require('../controllers/task')
const Authenticate = require('../middlewares/authenticate')
const Authorization = require('../middlewares/authorizationProject')
const AuthorizationTask = require('../middlewares/authorizationTask')

// create task (id project)
router.post('/:id', Authenticate, Authorization,TaskController.createTask)

// get all task for project (id project)
router.get('/:id', Authenticate, Authorization,TaskController.getAllTask)

// get one task (id task)
router.get('/:id/detail', Authenticate, AuthorizationTask,TaskController.getOneTask)

// update status task (id task)
router.put('/:id', Authenticate, AuthorizationTask, TaskController.updateStatusTask)

//edit task (id task)
router.patch('/:id', Authenticate, AuthorizationTask, TaskController.editTask)

// delete task (id task)
router.delete('/:id', Authenticate, AuthorizationTask, TaskController.deleteTask)

module.exports = router