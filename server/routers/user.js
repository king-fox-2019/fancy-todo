const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.signUp)
router.post('/login', UserController.signIn)
router.post('/googleSignIn', UserController.googleSignIn)

module.exports = router