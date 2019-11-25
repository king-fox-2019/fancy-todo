const { Group, User } = require('../models')

class GroupController {
  static createGroup(req, res, next) {
    Group.create({
      name: req.body.name,
      leader: req.payload.id
    })
      .then(group => {
        res.status(201).json({
          message: 'Group created',
          data: {
            _id: group._id,
            name: group.name,
            leader: group.leader,
            members: group.members
          }
        })
      })
      .catch(next)
  }

  static getAllUserGroups(req, res, next) {
    const as = req.query.as
    Group.find(
      as
        ? { [as]: req.payload.id }
        : {
            $or: [{ leader: req.payload.id }, { members: req.payload.id }]
          }
    )
      .populate({ path: 'leader', select: '_id username email' })
      .populate({ path: 'members', select: '_id username email' })
      .then(groups => {
        res.status(200).json({
          data: groups.map(group => {
            return {
              _id: group.id,
              name: group.name,
              leader: group.leader,
              members: group.members
            }
          })
        })
      })
  }

  static inviteMember(req, res, next) {
    if (!req.body.email) throw { status: 422, message: 'Email required' }
    const group = req.group
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) throw { status: 404, message: 'User not found' }
        if (group.members.includes(user._id))
          throw { status: 422, message: 'User already invited' }
        group.members.push(user._id)
        return group.save()
      })
      .then(group => {
        return Group.populate(group, {
          path: 'leader',
          select: '_id username email'
        })
      })
      .then(group => {
        return Group.populate(group, {
          path: 'members',
          select: '_id username email'
        })
      })
      .then(group => {
        res.status(200).json({
          message: 'New member invited',
          data: {
            _id: group.id,
            name: group.name,
            leader: group.leader,
            members: group.members
          }
        })
      })
      .catch(next)
  }
}

module.exports = GroupController
