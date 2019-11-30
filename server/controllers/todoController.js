const Todo = require("../models/todo");

class TodoController {
  static create(req, res, next) {
    const { name, description, due } = req.body;
    Todo.create({
      name,
      description,
      due,
      user: req.decoded.id
    })
      .then(response => {
        res.status(201).json({
          response,
          message: "success add new todo"
        });
      })
      .catch(next);
  }

  static read(req, res, next) {
    Todo.find({
      user: req.decoded.id
    })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(next);
  }

  static remove(req, res, next) {
    let id = req.params.id;
    Todo.deleteOne({
      _id: id
    })
      .then(response => {
        res.status(200).json({
          response,
          message: "success delete todo"
        });
      })
      .catch(next);
  }

  static update(req, res, next) {
    const id = req.params.id;
    const { status } = req.body;
    Todo.findByIdAndUpdate(
      {
        _id: id
      },
      {
        status
      },
      {
        new: true
      }
    )
      .then(response => {
        res.status(200).json({
          response,
          message: "success update data todo"
        });
      })
      .catch(next);
  }

  static updateAll(req, res, next) {
    const id = req.params.id;
    const { name, description, status, due } = req.body;
    Todo.findByIdAndUpdate(
      {
        _id: id
      },
      {
        name,
        description,
        status,
        due
      },
      {
        new: true
      }
    )
      .then(response => {
        res.status(200).json({
          response,
          message: "success update data todo"
        });
      })
      .catch(next);
  }

  static readOne(req, res, next) {
    const id = req.params.id;
    Todo.findById(id)
      .then(response => {
        res.status(200).json({
          response
        });
      })
      .catch(next);
  }
}

module.exports = TodoController;
