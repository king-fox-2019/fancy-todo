const jwt = require('../helpers/jsonwebtoken')
const Todo = require('../models/todo')

module.exports = (req,res,next) => {
    const id = req.params.id
    Todo
        .findById(id)
        .then((todo) => {
            if(todo.UserId == req.payload._id) next()
            else{
                res.status(403).json({message : "Error forbidden"})
            }
        })
        .catch(()=>{
            res.status(404).json({Name : "NotFound", Message : "Error not found"})
        })
    }
