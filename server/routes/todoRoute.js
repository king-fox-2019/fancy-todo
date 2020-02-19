const todoController = require('../controllers/todoController')
const auth = require('../middlewares/auth')
const express = require('express')
const router = express()

router.post('/',todoController.addTodo)
router.get('/',todoController.getTodo)
router.delete('/',auth,todoController.deleteTodo)
router.put('/',todoController.updateTodo)
router.get('/detail',todoController.getDetail)


module.exports = router