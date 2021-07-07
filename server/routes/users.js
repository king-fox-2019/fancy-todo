const router = require('express').Router()
const ControllerUser = require('../controllers/user')
const authenticate = require('../middlewares/authenticate')

router.post('/register', ControllerUser.register)

router.post('/login', ControllerUser.login)

router.post('/google-sign-in', ControllerUser.googleSignIn)

router.get('/', authenticate, ControllerUser.fetchOne)

router.get('/notifs', authenticate, ControllerUser.fetchNotifications)

router.get('/accept-project-invitation/:projectId', authenticate, ControllerUser.acceptProjectInvitation)

router.get('/decline-project-invitation/:projectId', authenticate, ControllerUser.declineProjectInvitation)

module.exports = router