const groups = require('express').Router()
const { GroupController } = require('../controllers')
const { authorizeGroup } = require('../middlewares/auth')

groups.post('/', GroupController.createGroup)

groups.use('/:id', authorizeGroup)
groups.patch('/:id', GroupController.editGroupName)
groups.delete('/:id', GroupController.deleteGroup)
groups.patch('/:id/members', GroupController.inviteMember)
groups.delete('/:id/members/:member_id', GroupController.kickMember)

module.exports = groups
