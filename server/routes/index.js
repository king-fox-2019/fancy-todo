const router = require('express').Router()
const userRoute = require('./user')
const todoRoute = require('./todo')
const projectRoute = require('./project')
const quoteGardenRoute = require('./quoteGarden')
const shibeRoute = require('./shibe')


router.use('/users', userRoute)
router.use('/todos', todoRoute)
router.use('/projects', projectRoute)
router.use('/quote', quoteGardenRoute)
router.use('/shibe', shibeRoute)

module.exports = router