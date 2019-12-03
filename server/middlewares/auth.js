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
  console.log(req.params.id, 'di auth project');
  
  let projectId = req.params.id
  Project.findById(projectId)
    .then(project => {
      console.log(project, 'ada kan project nya di prjct auth???');
      
      if (!project) {
        throw { status : 404, msg : 'project not found'}
      } else  {
        console.log(project.author, '===', req.loggedUser._id);
        console.log(String(project.author) === String(req.loggedUser._id));
        
        if (String(project.author) === String(req.loggedUser._id)) {
          next()
        } else {
          throw { status : 403, msg : 'you are not authorized to perform this task'}
        }
      }
    })
    .catch(next)
}

const memberAuthorization = (req, res, next) => {
  console.log(req.params.id, 'params projectId di member auth');
  
  let projectId = req.params.id
  Project.find({
    _id : projectId,   // <<<<<<< 
    members: req.loggedUser._id // <<<<<<<
  })
  
  .then(project => {
    console.log(project.author, 'punya siapa project nya? summon author di member auth');
    
    console.log(project, `project masuk find project di member auth`);
      if (!project) {
        throw {status : 404, msg : 'project not found'}
      } else if (String(project.author) === String(req.loggedUser._id)) {
          next()
      } else {
        console.log(project.members, "ada members gakkk mau for each di member auth");
        
        if (project.members.includes(req.loggedUser._id)) {
          next()
        } else {
          throw { status: 403, msg : 'you are not authorized to perform this task'}
        }


        // project.members.forEach(member => {
        //   console.log(member , '==', req.loggedUser._id);
        //   console.log(String(member) == String(req.loggedUser._id));
          

        //   if (String(member) === String(req.loggedUser._id)) {
        //     next()
        //   } else {
        //     throw { status: 403, msg : 'you are not authorized to perform this task'}
        //   }
        // })
      }
    })
    .catch(next)
}

module.exports = {
  authentication,
  authorization,
  projectAuthorAuthorization,
  memberAuthorization
}