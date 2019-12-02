const TodoModel = require('../models/todo')

module.exports = {
    createTodosProject(req,res,next){
        const UserId = req.loggedUser.id
        const { title, description, due_date } = req.body
        const { id } = req.params
        TodoModel.create({ title, description, due_date, UserId, projectId : id })
            .then(todo=>{
                res.status(201).json({
                    todo, message : 'create successfuly!'
                })
            })
            .catch(next)
    },
    create(req,res,next){
        const UserId = req.loggedUser.id
        const { title, description, due_date } = req.body
        TodoModel.create({ title, description, due_date, UserId})
            .then(todo=>{
                res.status(201).json({
                    todo, message : 'create successfuly!'
                })
            })
            .catch(next)
    },
    findAll(req,res,next){
        const UserId = req.loggedUser.id
        TodoModel.find({ UserId }).sort([['createdAt',-1]])
            .populate('UserId')
            .then(todos=>{
                res.status(200).json({
                    todos, message : 'find successfuly!'
                })
            })
            .catch(next)
    },
    findTitle(req,res,next){
        const userId = req.loggedUser.id
        TodoModel.find({ userId })
        .then(todos=>{
            const todoKu = []
            todos.filter(todo=>{
                if (todo.title.includes(req.params.title)) {
                    todoKu.push(todo)
                }
            })
            res.status(200).json({
                todos, message : 'find successfuly!'
            })
        })
        .catch(next)
    },
    updatePut(req,res,next){
        let { id } = req.params
        let { title, description, due_date } = req.body
        TodoModel.findOneAndUpdate({ _id : id },{ title, description, due_date }, { new: true, runValidators: true })
            .then(todo=>{
                res.status(200).json({
                    todo, message : 'update successfuly!'
                })
            })
            .catch(next)
    },
    updatePatch(req,res,next){
        let { id } = req.params
        TodoModel.find({ _id : id })
            .then(todo=>{
                if (todo.status == true) {
                    return TodoModel.findOneAndUpdate({ _id : id },{ status : false }, { new: true, runValidators: true })
                } else {
                    return TodoModel.findOneAndUpdate({ _id : id },{ status : true }, { new: true, runValidators: true })
                }
            })
            .then(todo=>{
                res.status(200).json({
                    todo, message : 'update successfuly!'
                })
            })
            .catch(next)
    },
    deleted(req,res,next){
        let { id } = req.params
        TodoModel.findOneAndDelete({ _id : id })
            .then(todo=>{
                res.status(200).json({
                    todo, message : 'delete successfuly!'
                })
            })
            .catch(next)
    }
}