const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')
const express = require('express')
const router = express.Router()

router.use('/todo',todoRoute)
router.use('/user',userRoute)

module.exports = router