const express = require('express');
const router = express.Router();
const routerTodo = require('./routerTodo');
const routerUser = require('./routerUser');

router.use('/api/todo', routerTodo);
router.use('/api/user', routerUser);

module.exports = router;