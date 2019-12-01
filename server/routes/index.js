const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const todoRoute = require('./todoRoute')
const authentication = require('../middleware/authentication')


router.use('/user', userRoute)
router.use('/todo',authentication, todoRoute)

module.exports = router