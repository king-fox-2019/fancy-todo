const Todo = require('../models/Todo')

class TodoController{
  static showAll(req, res, next){
    Todo.find({})
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static showOne(req, res, next){
    Todo.findById(req.params.id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static create(req, res, next){
    Todo.create({
      name: req.body.name,
      description: req.body.description,
      due_date: req.body.due_date,
      userId: req.userId
    })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch(next)
  }
  static delete(req, res, next){
    Todo.deleteOne({
      _id: req.params.id
    })
      .then((data) => {
        if (data.deletedCount == 0){
          throw new Error(`Todo not found`)
        }
        else{
          res.status(200).json({message})
        }
      })
      .catch(next)
  }
  static edit(req, res, next){
    const { name, description, due_date, status } = req.body
    const updateObj = { name, description, due_date, status }
    for (let key in updateObj){
      if (updateObj[key] == null){
        delete updateObj[key]
      }
    }
    const condition = { _id: req.params.id}
    Todo.findOneAndUpdate(condition, updateObj, {new: true})
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = TodoController