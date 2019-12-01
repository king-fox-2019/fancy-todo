const router = require('express').Router()
const UserController = require('../controllers/User')

router.get('/', UserController.getAll)
router.post('/', UserController.register)
router.post('/login', UserController.login)
router.post('/google', UserController.googleLogin)

module.exports = router