const router = require('express').Router()
const UserRouter = require('./user')
const TodoRouter = require('./todo')
const ProjectRouter = require('./project')

router.use('/user', UserRouter)
router.use('/todo', TodoRouter)
router.use('/project', ProjectRouter)

module.exports = router