const { decodeToken } = require('../helpers/jwt')
const User = require('../models/user')
const Todo = require('../models/todo')

function authenticate(req, res, next) {
    try {
        let decoded = decodeToken(req.headers.token)
        User.findOne({ _id : decoded.id })
            .then(user => {
                if(user) {
                    req.logged = user
                    next()
                }
                else {
                    next({status: 401, message: "Authentication failed"})
                }
            })
            .catch(next)
    }
    catch(err) {
        next({status: 401, message: err})
    }
}

function authorize(req, res, next) {
    let { id } = req.params
    Todo.findOne({_id: id})
        .then(todo => {
            if(todo && todo.user == req.logged.id){
                next()
            } else if(!todo) {
                next({ status: 404, message: "Data not found" })
            } else {
                next({ status: 401, message: "Authorization failed" })
            }
        })
        .catch(next)
}

module.exports = { authenticate, authorize }