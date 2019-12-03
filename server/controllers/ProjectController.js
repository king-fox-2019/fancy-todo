const Project = require('../models/project')
const User = require('../models/user')
const Todo = require('../models/todo')
const mailSender = require('../helpers/nodeMailer')

class ProjectController {
  static create(req, res, next) {
    let { name } = req.body
    let owner = req.loggedUser.id
    Project.find({ name })
      .then(result => {
        if (result && result.length != 0) {
          res.status(401).json({ message: 'Project is already exist' })
        } else {
          return Project.create({ name, owner })
        }
      })
      .then(result => {
        res.status(201).json({ project: result })
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Project.find()
      .populate('owner')
      .then(result => {
        let data = []
        for (let i = 0; i < result.length; i++) {
          if (result[i].owner._id == req.loggedUser.id) {
            data.push(result[i])
          } else {
            for (let j = 0; j < result[i].members.length; j++) {
              if (result[i].members[j]._id == req.loggedUser.id) {
                data.push(result[i])
              }
            }
          }
        }
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let { id } = req.params
    Project.findById({ _id: id })
      .populate('owner')
      .populate('members')
      .populate('todo_id')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static addMember(req, res, next) {
    let { id } = req.params
    let { email } = req.body
    let foundUser = {}
    User.findOne({ email })
      .then(userData => {
        if (userData) {
          foundUser = userData
          return Project.findById({ _id: id })
        } else {
          res.status(404).json({ message: 'Email not found' })
        }
      })
      .then(project => {
        let checkMember = project.members.indexOf(foundUser._id) == -1
        if (checkMember) {
          return Project.findOneAndUpdate({ _id: id }, { $push: { members: foundUser._id } }, { new: true })
        } else {
          throw ({ status: 400, message: 'User is already a member' })
        }
      })
      .then(result => {
        mailSender(foundUser.email)
        res.status(200).json(result)
      })
      .catch(next)
  }

  static deleteProject(req, res, next) {
    let { id } = req.params
    Project.deleteOne({ _id: id })
      .then(_ => {
        res.status(200).json({ message: 'Project deleted' })
      })
      .catch(next)
  }

  static addTodo(req, res, next) {
    let { id } = req.params
    // let { title, description, dueDate } = req.body
    let objTodo = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      user_id: req.loggedUser.id,
      project_id: id
    }
    Todo.create(objTodo)
      .then(result => {
        return Project.findOneAndUpdate({ _id: id }, { $push: { todo_id: result._id } }, { new: true })
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static deleteTodo(req, res, next) {
    let { id, todoId } = req.params
    Todo.deleteOne({ _id: todoId })
      .then(_ => {
        return Project.update({ _id: id }, { $pull: { todo_id: { _id: todoId } } }, { safe: true, multi: true })
      })
      .then(data => {
        res.status(200).json({ message: 'Todo deleted' })
      })
      .catch(next)
  }

  static updateTodo(req, res, next) {
    let { id, todoId } = req.params
    let { title, description, dueDate } = req.body
    Todo.update({ _id: todoId }, { title, description, dueDate })
      .then(_ => {
        return Project.update({ _id: id }, { $pull: { todo_id: { _id: todoId } } }, { safe: true, multi: true })
      })
      .then(_ => {
        res.status(200).json({ message: 'Todo update success' })

      })
      .catch(next)
  }

  static changeTodoStatus(req, res, next) {
    let { id, todoId } = req.params
    let { status } = req.body
    Todo.update({ _id: todoId }, { status })
      .then(data => {
        return Project.update({ _id: id }, { $pull: { todoId: { _id: todoId } } }, { safe: true, multi: true })
      })
      .then(_ => {
        res.status(201).json({ message: 'Todo status updated' })
      })
      .catch(next)
  }
}

module.exports = ProjectController