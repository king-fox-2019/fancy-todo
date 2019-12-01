const router = require('express').Router()


const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')



router.use('/todo', todoRouter)
router.use('/user', userRouter)


module.exports = router