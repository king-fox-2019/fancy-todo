const Todo = require('../models/todo')

function authorization(req,res,next){
    Todo.findOne({
        _id: req.params.id
    })
    .then(todo => {
        if(todo.creator == req.decoded.id){
            next()
        }else{
            next({
                status: 403,
                message: 'You dont have authorize to do action'
            })
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization