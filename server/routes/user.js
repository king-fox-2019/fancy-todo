const router = require('express').Router()
const UserController = require('../controllers/user')
const Authenticate = require('../middlewares/authenticate')
const GoogleVerify = require('../middlewares/googleVerify')

// get all user
router.get('/', UserController.getAllUser);

//search user
router.get('/search', Authenticate, UserController.searchUser);

// register
router.post('/register', UserController.registerUser);

// login
router.post('/login', UserController.loginUser);

//login google
router.post('/login/google', GoogleVerify, UserController.loginGoogle)

// get one user
router.get('/:id', UserController.getOneUser);


module.exports = router