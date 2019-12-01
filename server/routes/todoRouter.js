const router = require('express').Router()
const { TodoController } = require('../controllers')


router.get('/findall/:UserId', TodoController.findAll)
router.get('/findtodo/:UserId', TodoController.findOne)
router.post('/createtodo/:UserId', TodoController.createNewTodo)

router.patch('/updatetodo/:UserId', TodoController.patchTodo)
router.put('/updatetodo/:UserId', TodoController.putTodo)
router.delete('/deletetodo/:UserId', TodoController.deleteTodo)




router.get('/test', TodoController.test)
module.exports = router