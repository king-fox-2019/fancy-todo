const Controller = require('../controllers/userController');
const router = require('express').Router();

router.get('/login', Controller.login);
router.post('/', Controller.registerUser);



module.exports = router;