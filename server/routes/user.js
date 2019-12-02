const userController = require('../controllers/user')
const routes = require('express').Router()
const verify = require('../middlewares/google')
const { authentication } = require('../middlewares/auth')

routes.get('/', userController.findAll)
routes.get('/invitation', authentication, userController.viewInvite)
routes.get('/:idproject/invitation', authentication, userController.acceptInvite)
routes.post('/signup', userController.signup)
routes.post('/signin', userController.signin)
routes.post('/signinGoogle', verify, userController.google)
routes.delete('/:id', userController.delete)

module.exports = routes