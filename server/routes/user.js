const router = require('express').Router()
const UserController = require('../controllers/user')

// get all user
router.get('/', UserController.getAllUser);

// register
router.post('/register', UserController.registerUser);

// login
router.post('/login', UserController.loginUser);

// get one user
router.get('/:id', UserController.getOneUser);


module.exports = router