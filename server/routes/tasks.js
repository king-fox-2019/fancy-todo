"use strict"

const router = require('express').Router();
const tasksController = require('../controllers/tasksController');
const {taskAuth} = require('../middlewares/taskAuth')

router.post('/', tasksController.create)
router.get('/', tasksController.findAll)
router.get('/:id', taskAuth, tasksController.findOne)
router.patch('/:id', taskAuth, tasksController.update)
router.delete('/:id', taskAuth, tasksController.remove)

module.exports = router;