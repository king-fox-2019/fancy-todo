const Project = require('../models/project')
const Todo = require('../models/todo')
const User = require('../models/user')
const nodemailer = require('../helpers/nodemailer')


class ProjectController {

  static create(req, res, next) {
    let { name, description } = req.body
    // console.log(name, description)
    let creator = req.loggedUser.id
    Project.create({ name, description, creator })
      .then(created => {
        return Project.findByIdAndUpdate(
          created._id,
          {
            $push: {
              members: req.loggedUser.id
            }
          }, { new: true })
      })
      .then(created => {
        res.status(200).json(created)
      })
      .catch(next)
  }

  static allUser(req, res, next) {
    console.log(req.loggedUser.id);
    User.find({ "_id": { $ne: req.loggedUser.id } })
      .then(data => {
        console.log(data);
        res.status(200).json(data)
      })
      .catch(next)
  }

  static inviteMember(req, res, next) {
    let foundUser = {}
    User.findOne({
      email: req.body.email
    })
      .then(found => {
        if (!found) {
          throw ({ status: 404, message: `${req.body.email} is not registered!` })
        } else {
          foundUser = found
          return Project.findById(req.params.projectId)
        }
      })
      .then(project => {
        let checkMember = project.members.indexOf(foundUser._id) == -1
        // let checkPendingMembers = project.pendingMembers.indexOf(foundUser._id) == -1

        if (checkMember) {
          // checkPendingMembers
          project.pendingMembers.push(foundUser._id)
          project.members.push(foundUser._id)

          project.save()

          let messages = `
          Hey ${foundUser.name}. <br>
          ${req.loggedUser.name} [${req.loggedUser.email}] is inviting you to collaborate on ${project.name} Project.<br>
          If you wish you join the team and collaborate please go to your account on our website and check your pending invitations.<br>
          Otherwise, you can always decline ${req.loggedUser.email}'s invitation from your profile.<br>
          EnJoy-List your day.<br>
          <br>
          Thanks, JL.
          `
          nodemailer(foundUser.email, messages, foundUser.name, project.name)
          res.status(200).json({ message: `success invite ${foundUser.name} to join the project` })
        }
        else if (!checkMember) {
          throw ({ status: 400, message: "User is already a member" })
        }
        // else if (!checkPendingMembers) {
        //   throw ({ status: 400, message: "User has been invited" })
        // }
      })
      .catch(next)
  }

  static acceptProject(req, res, next) {
    // console.log(req.loggedUser.id);
    Project.findByIdAndUpdate(
      { _id: req.params.projectId },
      {
        $pull: {
          pendingMembers: req.loggedUser.id
        },
        $push: {
          members: req.loggedUser.id
        }
      }, { new: true })
      .then(updated => {
        res.status(200).json(updated)
      })
      .catch(next)
  }

  static declineProject(req, res, next) {
    Project.findByIdAndUpdate(
      req.params.projectId,
      {
        $pull: {
          pendingMembers: req.loggedUser.id
        }
      }, { new: true })
      .then(updated => {
        res.status(200).json(updated)
      })
      .catch(next)
  }

  static deleteMember(req, res, next) {
    let promises = []
    promises.push(Project.findByIdAndUpdate(
      req.params.projectId,
      {
        $pull: {
          members: req.params.memberId
        }
      }, { new: true }))
    promises.push(Todo.deleteMany({ projectId: req.params.projectId }))
    return Promise.all(promises)
      .then(updatedAndDeleted => {
        res.status(200).json(updatedAndDeleted)
      })
      .catch(next)
  }

  static deleteProject(req, res, next) {
    let promises = []
    promises.push(Project.findByIdAndRemove(req.params.projectId))
    promises.push(Todo.deleteMany({ projectId: req.params.projectId }))
    return Promise.all(promises)
      .then(deleteAll => {
        if (deleteAll) res.status(200).json(deleteAll)
        else throw ({ status: 404, message: 'Project not found' })
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    let { id } = req.loggedUser
    Project.find({ $or: [{ 'creator': id }, { 'members': id }] })
      .populate([
        { path: 'members', select: "-password" },
        'pendingMembers',
        'todos',
        { path: 'creator', select: "-password" }
      ])
      .then(projects => {
        console.log(projects);
        res.status(200).json(projects)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let id = req.params.projectId
    Project.findById(id)
      .populate([
        { path: 'members', select: "-password" },
        'todos',
        { path: 'creator', select: "-password" }
      ])
      .then(project => {
        console.log(project);
        if (!project) throw ({ status: 404, message: 'Project not found' })
        else res.status(200).json(project)
      })
      .catch(next)
  }

  static findTodoProject(req, res, next) {

    const projectId = req.params.projectId
    Todo.find({ projectId })
      .then(todos => {
        console.log(todos)
        res.status(200).json(todos)
      })
      .catch(next)
  }


}

module.exports = ProjectController