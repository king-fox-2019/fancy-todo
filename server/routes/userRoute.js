const router = require('express').Router();
const userController = require('../controllers/UserController.js');

console.log('*** userRoute ***')

router.post('/login', userController.login);
router.post('/googlesignin', userController.googleSignIn);
router.post('/register', userController.register);

module.exports = router;