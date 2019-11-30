const { decodeToken } = require('../helpers/jwt')
const Todo = require('../models/Todo')
const User = require('../models/User')
const Project = require('../models/Project')

const authentication = (req, res, next) => {
  // console.log(req.headers);
  
  User.findById(decodeToken(req.headers.access_token).id)
    .then(user => {
      if (!user) {
        throw {status: 401, msg: `please login first`}
      } else {
        req.loggedUser = user
        next()
      }
    })
    .catch(next)
  // try {
  //     req.loggedUser = decodeToken(req.headers.access_token) //option expire
  //     console.log(req.loggedUser);
  //     next()
  // } catch (err) {
  //   next(err)
  // }
}

const authorization = (req, res, next) => {
  let { id } = req.params //id todo
  console.log(req.params, "paramsssssssssssssssssssssssss");
  
  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        throw {status : 404, msg : `to-do not found`}
      } else {        
        if (String(todo.userId) === String(req.loggedUser._id)) {
          next()
        } else {
          throw {status: 401, msg: 'you are not authorized to perform this task'}
        }
      }
    })
    .catch(next)
}


const projectAuthorAuthorization = (req, res, next) => {
  let projectId = req.params.id
  Project.findById(projectId)
    .then(project => {
      if (!project) {
        throw { status : 404, msg : 'project not found'}
      } else  {
        if (project.author === req.loggedUser._id) {
          next()
        } else {
          throw { status : 403, msg : 'you are not authorized to perform this task'}
        }
      }
    })
    .catch(next)
}

const memberAuthorization = (req, res, next) => {
  let projectId = req.params.id
  Project.findById(projectId)
    .then(project => {
      if (!project) {
        throw {status : 404, msg : 'project not found'}
      } else if (project.author === req.loggedUser._id) {
          next()
      } else {
        Project.members.forEach(member => {
          if (member == req.loggedUser._id) {
            next()
          } else {
            throw { status: 403, msg : 'you are not authorized to perform this task'}
          }
        })
      }

      
    })
}

module.exports = {
  authentication,
  authorization,
  projectAuthorAuthorization,
  memberAuthorization
}