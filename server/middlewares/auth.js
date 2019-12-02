const { verifyToken } = require('../helpers/jwt')
const UserModel = require('../models/user')
const TodoModel = require('../models/todo')
const ProjectModel = require('../models/project')

function authentication(req, res, next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        UserModel.findById(decodedToken.id)
            .then(user => {
                console.log(user);
                if(user){
                    req.loggedUser = decodedToken
                    next()
                }
                else{
                    next({
                        status: 401,
                        message: 'Authentication Failed'
                    })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ 
            status: 401,
            message: err 
        })
    }
}
function authorizationTodo(req, res, next){
    TodoModel.findOne({ _id : req.params.id })
        .then(result => {
            if(!result){
                next({ status: 404, message: 'Not Found' })
            }
            else if(result.UserId == req.loggedUser.id){
                next()
            }
            else{
                next({ 
                    status: 403, 
                    message: 'Not Authorized' 
                })
            }
        })
        .catch(next)
}
function authorizationProject(req, res, next){
    ProjectModel.findOne({ _id : req.params.id })
        .then(result => {
            if(!result){
                next({ status: 404, message: 'Not Found' })
            }
            else if(result.owner == req.loggedUser.id){
                next()
            }
            else{
                next({ 
                    status: 403, 
                    message: 'Not Authorized' 
                })
            }
        })
        .catch(next)
}
module.exports = { authentication, authorizationTodo, authorizationProject }