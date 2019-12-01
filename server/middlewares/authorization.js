const jwt = require('../helpers/jsonwebtoken')
const Todo = require('../models/todo')

module.exports = (req,res,next) => {
    const id = req.params.id
    Todo
        .findById(id)
        .then((todo) => {
            if(todo.UserId == req.payload._id) next()
            else{
                console.log('salah idnya')
            }
        })
    }
