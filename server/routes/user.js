const router = require('express').Router()

const User = require('../controllers/UserController')
const googleSignIn = require('../middlewares/googleSignIn')

router.post('/register',User.register)
router.post('/login',User.login)
router.post('/glogin',googleSignIn,User.googleLogin)

module.exports = router