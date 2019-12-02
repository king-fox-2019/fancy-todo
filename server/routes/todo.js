const Todo = require('../models/todo')
const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const {authentication} = require('../middlewares/authentication')

function authorization(req,res,next){
    Todo.findById({_id : req.params.id})
    .then(todo => {
        if(todo.assignee == req.loggedUser.id || todo.userId == req.loggedUser.id ){
            next()
        }else{
            res.status(404).json({ message : 'you are not authorized to perform this action' })
        }
    })
}

router.use(authentication)

router.get('/',TodoController.findAll)
router.get('/onProgress',TodoController.findOnProgress)
router.get('/starred',TodoController.findStarred)
router.get('/done',TodoController.findDone)
router.post('/',TodoController.create)
router.get('/:id',TodoController.findOne)
router.delete('/:id',authorization,TodoController.delete)
router.put('/:id',authorization,TodoController.update)
router.patch('/:id/status',authorization,TodoController.updateStatus)
router.patch('/:id/starred',authorization,TodoController.updateStarred)

module.exports = router