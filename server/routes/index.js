const router = require('express').Router()
const users = require('./users')
const todos = require('./todos')
const projects = require('./projects')

const authenticate = require('../middlewares/authenticate')

router.get('/', function(req, res){
  res.send('ini home')
})

router.use('/users', users)

router.use('/todos', authenticate, todos)

router.use('/projects', authenticate, projects)

module.exports = router