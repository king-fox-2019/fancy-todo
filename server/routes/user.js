const Controller = require('../controllers/userController');
const router = require('express').Router();

router.post('/login', Controller.login);
router.post('/login-google', Controller.googleLogin);
router.post('/', Controller.registerUser);



module.exports = router;
