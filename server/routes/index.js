const router = require('express').Router();
const userRoute = require('./userRoute.js');
const todosRoute = require('./todoRoute.js');
const projectsRoute = require('./projectsRoute.js');

console.log('*** indexRoute ***')

router.use('/user', userRoute);
router.use('/todos', todosRoute);
router.use('/projects', projectsRoute);

module.exports = router;