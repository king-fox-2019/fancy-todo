const router = require('express').Router()
const routerUser = require('./user')
const routerTodo = require('./todo')
const routerProject = require('./project')
const { authentication } = require('../middlewares/auth')

router.use('/users', routerUser)

router.use(authentication)
router.use('/todos', routerTodo)
router.use('/projects', routerProject)

module.exports = router