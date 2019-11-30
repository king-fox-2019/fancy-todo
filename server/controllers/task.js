const Todo = require('../models/todo')
const Project = require('../models/project')

class TaskController{
    static createTask(req,res,next){
        Todo.create({
            title: req.body.title,
            desc: req.body.desc,
            dueDate: req.body.duedate,
            creator: req.decoded.id || req.user.id,
            projectId: req.params.id
        })
        .then(todo => {
            return Project.findOneAndUpdate({
                _id: req.params.id
            },
            {
                $push : { task : todo._id }
            })
        })
        .then(task => {
            res.status(201).json({
                message: 'Adding task success!'
            })
        })  
        .catch(err => {
            next(err)
        })
    }

    static getAllTask(req,res,next){
        let {id} = req.params
        Todo.find({projectId : id})
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                next(err)
            })
    }

    static updateStatusTask(req,res,next){
        Todo.findOneAndUpdate({
            _id: req.params.id
        },
        {
            status: "Done"
        },
        {
            new: true
        })
        .then(result => {
            res.status(200).json({
                message: `Success update status task!`,
                projectId: result.projectId
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTask(req,res,next){
        Todo.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            if(result.n > 0){
                return Project.findOneAndUpdate({
                    _id: req.project._id
                },
                {
                    $pull: { task : req.params.task}
                },
                {
                    new: true
                })
            }else{
                throw({
                    status: 400,
                    message: 'There is no task!'
                })
            }
        })
        .then(project => {
            res.status(200).json({
                message: 'Success delete task',
                projectId : project._id
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static getOneTask(req,res,next){
        Todo.findOne({
            _id: req.params.id
        })
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            next(err)
        })
    }

    static editTask(req,res,next){
        Todo.findOneAndUpdate({
            _id: req.params.id
        },
        {
            title: req.body.title,
            desc: req.body.desc
        },
        {
            new: true
        })
        .then(task => {
            res.status(200).json({
                message: 'Updata Task Success',
                projectId: task.projectId
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController