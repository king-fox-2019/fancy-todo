const routes = require('express').Router()
const UserController = require('../controllers/UserController')
const { authenticate } = require('../middlewares/auth')

routes.post('/login', UserController.login)
routes.post('/', UserController.create)
routes.delete('/', authenticate, UserController.delete)

module.exports = routes