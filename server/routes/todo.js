'use strict';

const ownerOnly = require('../middlewares/authorization');
const router = require('express').Router();
const Controller = require('../controllers/todoController');
const authentication = require('../middlewares/authentication')

router.use(authentication);
router.get('/', Controller.todoList); // fetch data
router.post('/', Controller.createTodo); //post todo
router.patch('/', ownerOnly, Controller.markAskDone); // Mark todo as "Done"
router.delete('/', ownerOnly, Controller.destroy); // Delete todo

module.exports = router