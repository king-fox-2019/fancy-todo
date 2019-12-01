const { Todo } = require('../models')

class TodoController
{

    static test(req,res)
      {
          res.send('hello todo connected')
      }

      
    static findAll(req,res,next)
      {
        Todo.find({
            UserId:req.params.UserId
        })
        .populate('UserId', 'username email password -_id')
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
      }


    static findOne(req,res,next)
      {

      }
    

    static createNewTodo(req,res,next)
      {
        const UserId = req.params.UserId
        const { name, description, status, due_date } = req.body
        
        Todo.create({
            UserId,
            name,
            description,
            status,
            due_date
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
      }

    
    static putTodo(req,res,next)
      {
        const { _id, name, description, status, due_date } = req.body

        Todo.update(
            {_id},
            { name, description, status, due_date}
        )
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)

      }

      
    static patchTodo(req,res,next)
      {
        const { _id } = req.body

        Todo.update(
            {_id},
            {$set: req.body}
        )
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)

      }

    
    static deleteTodo(req,res,next)
      {
        const { _id } = req.body
        Todo.deleteOne({ _id })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
      }

}

module.exports = TodoController