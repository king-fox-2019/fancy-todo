const router = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')
const projectRouter = require('./project')

router.use('/todo', todoRouter)
router.use('/user', userRouter)
router.use('/project', projectRouter)


module.exports = router