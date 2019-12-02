"use strict"

const router = require('express').Router();
const usersController = require('../controllers/usersController');

// router.get('/:email', usersController.findOne)
router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.post('/googlelogin', usersController.googleLogin)

module.exports = router;