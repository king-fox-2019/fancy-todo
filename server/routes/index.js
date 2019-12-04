const router = require('express').Router()
const UserRoutes = require('./user')
const TodoRoutes = require('./todo')
const ProjectRoutes = require('./project')

router.use('/users',UserRoutes)
router.use('/todos',TodoRoutes)
router.use('/projects',ProjectRoutes)

module.exports = router