const express = require("express");
const user = express.Router();
const userController = require("../controllers/userController");

user.post('/', userController.addUser);
user.get('/', userController.showUsers);
user.get('/:userId', userController.showUser);
user.put('/:userId', userController.editUser);
user.patch('/:userId', userController.editUserSpecified);
user.delete('/:userId', userController.deleteUser);

module.exports = user;