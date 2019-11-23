const routes = require('express').Router()
const { UserController } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

routes.post('/signup', UserController.signUp)
routes.post('/signin', UserController.signIn)
routes.get('/checksession', authenticate, UserController.checkSession)
// routes.use('/todos')

module.exports = routes
