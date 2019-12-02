const router = require('express').Router();
const userRouter = require('./users');
const projectRouter = require('./projects');
const todoRouter = require('./todos');
const invitationRouter = require('./invitations');

router.use('/users', userRouter)
router.use('/projects', projectRouter)
router.use('/todos', todoRouter)
router.use('/invitations', invitationRouter)

module.exports = router;