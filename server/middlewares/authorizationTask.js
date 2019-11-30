const Todo = require('../models/todo')

function authorization(req,res,next){
    Todo.findOne({
        _id: req.params.id
    })
    .populate('projectId')
    .then(todo => {
        let project = todo.projectId
        if(project.creator == req.decoded.id || project.members.includes(req.decoded.id)){
            req.project = project
            next()
        }else{
            next({
                status: 403,
                message: 'You dont have permission to do action!'
            })
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization