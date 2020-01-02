const routes = require('express').Router()
const UserController = require('../controllers/userCon')
const { authenticate , authorize } = require('../middleware/auth')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/googlesign', UserController.googleSignIn)

routes.use(authenticate)

routes.get('/',UserController.findAll)
routes.get('/:id', UserController.findOne)

module.exports = routes