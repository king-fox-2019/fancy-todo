const router = require('express').Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication').authentication

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/loginGoogle', UserController.loginGoogle)

router.use(authentication)

router.get('/profile', UserController.UserProfile)

module.exports = router