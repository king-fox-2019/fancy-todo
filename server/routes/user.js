const Controller = require('../controllers/userController');
const router = require('express').Router();

router.post('/', Controller.registerUser);
router.post('/login', Controller.login);
router.post('/login-google', Controller.googleLogin);



module.exports = router;
