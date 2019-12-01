'use strict'

const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const googleVerify = require('../middleware/googleVerify')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/login/google', googleVerify, userController.google)

module.exports = router