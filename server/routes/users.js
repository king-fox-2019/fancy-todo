const router = require('express').Router();
const UserController = require('../controllers/user');

router.get('/', UserController.showAll);
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/gSignIn', UserController.googleSign);

module.exports = router;