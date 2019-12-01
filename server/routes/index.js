const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const Auth = require('../middlewares/tokenCheck')

router.use('/user', userRouter)

router.use('/todo', todoRouter)




module.exports = router