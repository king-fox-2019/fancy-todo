const groups = require('express').Router()
const { GroupController } = require('../controllers')

groups.post('/', GroupController.createGroup)
groups.patch('/')

module.exports = groups
