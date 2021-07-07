const router = require('express').Router()
const ControllerProject = require('../controllers/project')
const authorizeProjectMember = require('../middlewares/authorizeProjectMember')
const authorizeProjectOwner = require('../middlewares/authorizeProjectOwner')

router.post('/', ControllerProject.create)

router.get('/user', ControllerProject.fetchByUserId)

router.get('/:id', authorizeProjectMember, ControllerProject.fetchById)

router.delete('/:id', authorizeProjectOwner, ControllerProject.delete)

router.put('/:id', authorizeProjectOwner, ControllerProject.update)

router.post('/:id/invite-member', authorizeProjectMember, ControllerProject.inviteMember)

router.patch('/:id/remove/:memberId', authorizeProjectOwner, ControllerProject.removeMember)

// CRUD TODO

router.post('/:id/todo', authorizeProjectMember, ControllerProject.addTodo)

router.delete('/:id/todo/:todoId', authorizeProjectMember, ControllerProject.deleteTodo)

router.get('/:id/todo/:todoId', authorizeProjectMember, ControllerProject.getOneTodo)

router.put('/:id/todo/:todoId', authorizeProjectMember, ControllerProject.updateTodo)

router.patch('/:id/todo/:todoId/complete', authorizeProjectMember, ControllerProject.completeTodo)

router.patch('/:id/todo/:todoId/important', authorizeProjectMember, ControllerProject.markImportantTodo)

module.exports = router
