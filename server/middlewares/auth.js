const verifyToken = require('../helpers/tokenMaker').decodeToken
const User = require('../models/user')
const Todo = require('../models/todo')
const Project = require('../models/project')

function authentication(req, res, next) {
    try {
        let decodedToken = verifyToken(req.headers.token)
        User.findById(decodedToken.id)
            .then(user => {
                if(user) {
                    req.loggedUser = decodedToken
                    next()
                } else {
                    next({ status: 401, message: 'Authentication failed' })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ status: 401, message: err })
    }
}

function authorization(req, res, next) {
    let { id } = req.params
    Todo.findById(id)
        .then(todo => {
            if(todo && todo.user_id == req.loggedUser.id) {
                next()
            } else if(!todo) {
                next({ status: 404, message: "Data not found" })
            } else {
                next({ status: 401, message: "Authorization failed" })
            }
        })
        .catch(next)
}

function projectOwnerAuthorization(req, res, next) {
    let { id } = req.params
    Project.findOne({ _id: id })
        .then(data => {
            if(data.owner == req.loggedUser.id) {
                next()
            } else {
                next({ status: 401, message: "Project Owner authorization failed"})
            }
        })
        .catch(next)
}

function projectMemberAuthorization(req, res, next) {
    let { id } = req.params
    Project.findById({ _id: id })
        .then(data => {
            if(data.owner == req.loggedUser.id) {
                next()
            } else if(data.members.includes(req.loggedUser.id)) {
                next()
            } else {
                next({status: 401, message: "Project Member authorization failed"})
            }
        })
        .catch(next)
}

module.exports = {
    authentication, authorization, projectOwnerAuthorization, projectMemberAuthorization
}