"use strict"

const router = require('express').Router();
const tagsRouter = require('./tags');
const tasksRouter = require('./tasks');
const usersRouter = require('./users');
const {authenticate} = require('../middlewares/authentication')


router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Fancy Todo!'
  })
})

router.use('/users', usersRouter);
router.use(authenticate);
router.use('/tags', tagsRouter);
router.use('/tasks', tasksRouter);


module.exports = router;