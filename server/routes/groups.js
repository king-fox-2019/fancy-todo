const groups = require('express').Router()
const { GroupController } = require('../controllers')
const { authorizeGroup } = require('../middlewares/auth')

groups.post('/', GroupController.createGroup)

groups.use('/:id', authorizeGroup)
groups.patch('/:id/members/invite', GroupController.inviteMember)

module.exports = groups
