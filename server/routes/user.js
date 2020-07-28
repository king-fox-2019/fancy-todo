'use strict'

const express = require('express')
const user = express.Router()
const userCon = require('../controllers/UserCon')
const { authenticate } = require('../middlewares/auth')


user.get('/', userCon.findAll)
user.post('/register', userCon.register)
user.post('/login', userCon.login)
user.post('/login-google', userCon.loginGoogle)

user.use(authenticate)

user.get('/one', userCon.findOne)

module.exports = user