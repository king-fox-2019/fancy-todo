const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')
const Todo = require('../models/todo')
const Project = require('../models/project')

function authentication (req, res, next){
  try {
    let decodedToken = verifyToken(req.headers.token)
    console.log('verify token >>>>>', decodedToken)
    User.findById(decodedToken._id)
      .then(user => {
        if(user){
          req.loggedUser = decodedToken
          console.log('success')
          next()
        }
        else{
          next({ status: 401, message: 'Authentication Failed' })
        }
      })
      .catch(next)
  }
  catch(err) {
    next({ status: 401, message: err })
  }
}

function todoAuthorization(req, res, next) {
  Todo.find({userId: req.loggedUser._id})
      .then(todos => {
        for (let i=0; i<todos.length; i++) {
          if (todos[i]._id == req.params.todoId ) next()
        }
      })
      .catch(err => {
        next({ status: 401, message: err })
      })
}

function projectAuthorization(req, res, next) {
  const _id = req.params.projectId
  Project.findById(_id)
      .then(project => {
        if (project){
          let status = false
          for (let i=0; i<project.members.length; i++) {
            console.log(project.members[i])
            console.log(req.loggedUser._id, project.members[i].status)

            if (project.members[i]._id == req.loggedUser._id && project.members[i].status == 'true') status = true
            console.log(status)
          }
          if (status) next()
          else next({ status: 401, message: 'Authorization Failed' })
        } 
        else next({ status: 401, message: 'Authorization Failed' })
      })
      .catch(err => {
        next({ status: 401, message: err })
      })
}

function adminAuthorization(req, res, next) {
  const _id = req.params.projectId
  Project.findById(_id)
      .then(project => {
        if (project.admin == req.loggedUser._id) next()
        else next({ status: 401, message: 'Authorization Failed' })
      })
      .catch(err => {
        next({ status: 401, message: err })
      })
}

module.exports = { authentication, todoAuthorization, projectAuthorization, adminAuthorization }
