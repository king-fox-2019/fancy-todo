const express = require('express');
const router = express.Router();
const ControllerUser = require('../controllers/ControllerUser');
const tokenChecking = require('../middlewares/tokenChecking');
const roleChecking = require('../middlewares/roleChecking');

//login
router.post("/login", ControllerUser.login);

//checking token
router.use(tokenChecking);
// view user
router.get("/", ControllerUser.viewUser);
// create user
router.post("/", roleChecking, ControllerUser.createUser);
// update user
router

module.exports = router;