const Project = require('../models/Project')
const User = require('../models/User')
const Todo = require('../models/Todo')

class ControllerProject {
  static create(req, res, next) {
    const { name } = req.body
    Project
      .create({ name, owner: req.loggedUser.id })
      .then(project => {
        res.status(201).json({
          message: 'Created a project!', project
        })
      })
      .catch(next)
  }

  static fetchByUserId(req, res, next) {
    // console.log('ini req loggedUser', req.loggedUser);
    Project
      .find({
        $or: [{
          members: req.loggedUser.id
        }, {
          owner: req.loggedUser.id
        }]
      })
      .populate('members')
      .populate({
        path: 'todos',
        populate: [{
          path: 'assignedTo'
        },
        {
          path: 'user'
        }]
      })
      .populate('owner')
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(next)
  }

  static fetchById(req, res, next) {
    Project
      .findById(req.params.id)
      .populate('members')
      .populate('owner')
      .populate({
        path: 'todos',
        populate: {
          path: 'user'
        }
      })
      .then(project => {
        res.status(200).json(project)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Project
      .findByIdAndDelete(req.params.id)
      .then(project => {
        res.status(200).json({
          message: `Deleted project ${project.name}!`,
          project
        })
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { name } = req.body
    Project
      .findByIdAndUpdate(req.params.id, { name }, { omitUndefined: true })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static inviteMember(req, res, next) {
    const { memberEmail } = req.body
    // console.log('ini req user name', req.loggedUser);
    let user
    User
      .findOne({ email: memberEmail })
      .then(userData => {
        user = userData
        if (!user) throw {
          name: 'NotFound',
          status: 404,
          message: `User with email address ${memberEmail} not found!`
        }
        // console.log('ini user pas diinvite', user);
        user.notifications.forEach(notification => {
          console.log('ini user notifications pas diinvite', notification);
          
          if (notification.name === 'ProjectInvitation' && notification.projectId == req.params.id && notification.addressed === false) throw {
            name: 'DuplicateInvitation',
            status: 400,
            message: `${user.email} has already been invited to this project by ${notification.inviter}! \n Please wait until s/he addressed the previous invitation before sending out another one.`
          }
        })
        return Project
          .findById(req.params.id)
      })
      .then(project => {
        return User
          .findByIdAndUpdate(user._id,
            {
              $push: {
                notifications: {
                  name: 'ProjectInvitation',
                  message: `You have been invited to project ${project.name} by ${req.loggedUser.email}.`,
                  projectId: req.params.id,
                  accepted: false,
                  declined: false,
                  addressed: false,
                  inviter: req.loggedUser.email
                }
              }
            }, { new: true })
      })
      .then(user => {
        // console.log('ini user yg diinvite', user);
        res.status(200).json({
          message: `Project invitation has been sent to ${user.email}!`
        })
      })
      .catch(next)
  }

  static removeMember(req, res, next) {
    console.log('masuk remove member', req.params);
    
    Project
      .findByIdAndUpdate(req.params.id, {
        '$pull': { 'members': req.params.memberId },
      }, { new: true })
      .then(project => {
        console.log('ini project pas remove member', project)
        
        res.status(200).json({
          message: 'Removed a member from the project!',
          project
        })
      })
      .catch(next)
  }

  // CRUD TODO

  static addTodo(req, res, next) {
    const { title, description, dueDate, assignedTo } = req.body
    let todo = {}
    Todo
      .create({
        title, description, dueDate, assignedTo, completed: false, user: req.loggedUser.id, important: false, project: req.params.id
      })
      .then(todoResult => {
        todo = todoResult
        return Project
          .findByIdAndUpdate(req.params.id, {
            $push: { todos: todo._id }
          }, { new: true })
      })
      .then(project => {
        res.status(200).json({
          message: 'Added a new task to the project!', project
        })
      })
      .catch(next)
  }

  static deleteTodo(req, res, next) {
    const { todoId } = req.params
    Todo
      .findByIdAndDelete(todoId)
      .then(() => {
        return Project
          .findByIdAndUpdate(req.params.id, {
            $pull: { todos: todoId }
          }, { new: true })
      })
      .then(project => {
        res.status(200).json({
          message: 'Deleted a task in the project!', project
        })
      })
      .catch(next)
  }

  static getOneTodo(req, res, next) {
    const { todoId } = req.params
    // console.log('ini todoId pas getOneTodo', todoId)
    // console.log('ini loggedUser pas getOneTodo', req.loggedUser.id)
    Todo
      .findOne({ _id: todoId })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static deleteTodo(req, res, next) {
    const { todoId } = req.params
    Todo
      .findByIdAndDelete(todoId)
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static updateTodo(req, res, next) {
    const { title, description, completed, dueDate, important } = req.body
    const { todoId } = req.params
    Todo
      .findByIdAndUpdate(todoId, {
        title, description, completed, dueDate, important
      }, {
        omitUndefined: true
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static completeTodo(req, res, next) {
    // console.log('masuk ke complete todo project', req.params.id);
    const { todoId } = req.params
    let completed
    Todo
      .findById(todoId)
      .then(todo => {
        if (todo.completed) {
          completed = false
        } else {
          completed = true
        }
        return Todo
          .findByIdAndUpdate(todoId, { completed })
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static markImportantTodo(req, res, next) {
    const { todoId } = req.params
    let important
    Todo
      .findById(todoId)
      .then(todo => {
        if (todo.important) {
          important = false
        } else {
          important = true
        }
        return Todo
          .findByIdAndUpdate(todoId, { important })
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }
}

module.exports = ControllerProject