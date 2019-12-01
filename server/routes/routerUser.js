const express = require('express');
const router = express.Router();
const ControllerUser = require('../controllers/ControllerUser');

// view user
router.get("/", ControllerUser.viewUser);
// create user
router.post("/", ControllerUser.createUser);
//login
router.post("/login", ControllerUser.login);

module.exports = router;