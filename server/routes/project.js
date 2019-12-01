const router = require('express').Router()
const projectController = require('../controllers/projectController')
const project = require('../models/project')
const {authentication} = require('../middlewares/authentication')

function OwnerAuthorization(req,res,next){
    project.findById({_id : req.params.id})
    .then(project => {
        if(project && project.owner._id == req.loggedUser.id){
            next()
        }else{
            res.status(401).json({ message : 'you are not authorized to perform this action' })
        }
    })
    .catch(err => {
        console.log(err)
        next({
        status : 404,
        message : 'bad request'
    })
    })
}

function MemberAuthorization(req,res,next){
    project.findById({_id : req.params.id})
    .then(project => {
        console.log(project, " << ")
        if(project && project.owner._id == req.loggedUser.id || project.members.indexOf(req.loggedUser.id) !== -1){
            console.log("if")
            next()
        }else{
            res.status(401).json({ message : 'you are not authorized to perform this action' })
        }
    })
    .catch(err => {
        console.log(err)
        next({
        status : 404,
        message : 'bad request'
    })
    })
}


router.use(authentication)
router.get('/',projectController.showAll)
router.post('/',projectController.create)
router.get('/:id',projectController.projectDetails)
router.delete('/:id',MemberAuthorization,projectController.deleteProject)
router.put('/:id',MemberAuthorization,projectController.updateProjectDetail)
router.patch('/:id/leave',MemberAuthorization,projectController.leaveGroup)
router.patch('/:id/addmembers',OwnerAuthorization,projectController.addMembers)
router.patch('/:id/removemembers',OwnerAuthorization,projectController.removeMembers)

router.get('/:id/todos',MemberAuthorization,projectController.showTodo)
router.post('/:id/todos',MemberAuthorization,projectController.addTodo)
router.get('/:id/todos/:todoid',MemberAuthorization,projectController.findOne)
router.delete('/:id/todos/:todoid',MemberAuthorization,projectController.deleteTodo)
router.put('/:id/todos/:todoid',MemberAuthorization,projectController.updateTodo)
router.patch('/:id/todos/:todoid/status',MemberAuthorization,projectController.updateTodoStatus)
router.patch('/:id/todos/:todoid/starred',MemberAuthorization,projectController.updateTodoStarred)


module.exports = router