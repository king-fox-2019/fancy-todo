const { decodeToken } = require('../helpers/jwt')
const Todo = require('../models/todo')
const User = require('../models/user')
const Project = require('../models/project')

const authentication = (req, res, next) => {
    try {
        req.loggedUser = decodeToken(req.headers.token)
        // console.log(req.loggedUser);

        User.findOne({
            email: req.loggedUser.email
        })
            .then(user => {
                // console.log('masuk hmmmm oy auth');
                // console.log(user);
                if (user) next()
                else throw new Error({ status: 401, message: 'Authentication Failed' })
            })
            .catch(next)
    }
    catch (error) {
        next(error)
    }
}

const authorization = (req, res, next) => {
    console.log("masuk");
    let id = req.params.id
    console.log(id);

    Todo.findOne({ _id: id })
        .then(todo => {
            if (!todo) {
                next({ status: 404, message: `cannot find task with id ${id}` })
            }
            else if (todo.UserId == req.loggedUser.id) {
                next()
            }
            else {
                next({ status: 403, message: `You're not authorize to perform this action` })
            }
        })
        .catch(err => {
            next({ status: 403, message: err })
        })
}

const memberProject = (req, res, next) => {
    const id = req.params.projectId
    console.log(req.params.projectId, req.params.id);
    Project.findById(id)
        .then(project => {
            console.log(project);
            if (!project) {
                next({ status: 404, message: `Project not found` })
            } else {
                // console.log(project)
                return project.members.includes(req.loggedUser.id)
            }
        })
        .then(members => {
            // console.log(members)
            if (members) {
                next()
            }
            else {
                next({ status: 403, message: `You're not authorize to perform this action` })
            }
        })
        .catch(err => {
            next({ status: 403, message: err })
        })
}

const ownerProject = (req, res, next) => {
    const _id = req.params.projectId
    const creator = req.loggedUser.id
    console.log(creator)
    Project.findOne({ _id, creator })
        .then(project => {
            console.log(project)
            if (project) {
                next()
            }
            else {
                next({ status: 403, message: `You're not authorize to perform this action` })
            }
        })
        .catch(err => {
            next({ status: 403, message: err })
        })
}


module.exports = {
    authentication,
    authorization,
    ownerProject,
    memberProject
}