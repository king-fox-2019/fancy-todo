'use strict'

const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
// const authentication = require('../middleware/authentication')

router.use('/users', userRouter)
router.use('/todos', todoRouter)

module.exports = router