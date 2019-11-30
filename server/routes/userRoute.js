const router = require('express').Router()
const userController = require('../controllers/User')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/google', userController.googleLogin)

module.exports = router