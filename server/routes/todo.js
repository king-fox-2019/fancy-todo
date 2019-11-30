'use strict';

const ownerOnly = require('../middlewares/authorization');
const router = require('express').Router();
const Controller = require('../controllers/todoController');

router.get('/', Controller.todoList); // fetch data
router.post('/', Controller.createTodo); //post todo
router.use(ownerOnly);
router.patch('/', Controller.markAskDone);
router.delete('/', Controller.destroy);

module.exports = router