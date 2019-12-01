const router = require('express').Router()
const routerUser = require('./user')
const routerTodo = require('./todo')

router.use('/user', routerUser)
router.use('/todo', routerTodo)

module.exports = router