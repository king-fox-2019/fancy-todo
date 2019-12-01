const router = require('express').Router()
const UserRouter = require('./user')
const TodoRouter = require('./todo')
const errorHandler = require('../middlewares/errorHandler')
const {authentication} = require('../middlewares/auth')

router.use('/user', UserRouter)

router.use(authentication)

router.use('/todo', TodoRouter)
router.use(errorHandler)

module.exports = router