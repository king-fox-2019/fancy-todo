const express = require('express')
const router = express.Router()

const { userController } = require('../controllers')
const googleLogin = require('../middleware/google-login')


router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/google-signin', googleLogin, userController.googleLogin)


module.exports = router
