const Project = require("../models/project");
const User = require("../models/user");
const Todo = require("../models/todo");
const ObjectId = require("mongoose").Types.ObjectId;

class ProjectController {
  //ADMIN
  static createProject(req, res, next) {
    const { name, description } = req.body;
    Project.create({
      name,
      description,
      admin: req.decoded.id,
      member: [req.decoded.id]
    })
      .then(response => {
        res.status(201).json({
          response,
          message: "success create project"
        });
      })
      .catch(next);
  }

  static removeProject(req, res, next) {
    let idProject = req.params.idProject;
    Project.findByIdAndDelete(idProject)
      .then(response => {
        res.status(200).json({
          response,
          message: "success delete project"
        });
      })
      .catch(next);
  }

  static editMember(req, res, next) {
    let idProject = req.params.idProject;
    let idMember;
    if (req.params.edit === "add") {
      const { email } = req.body;
      User.findOne({
        email
      })
        .then(response => {
          // console.log(response);
          if (!response) {
            throw {
              status: 404,
              message: "User not found"
            };
          } else {
            idMember = new ObjectId(response._id);
            return Project.findOne({
              pendingMember: {
                $in: [idMember]
              }
            });
          }
        })
        .then(response => {
          if (response) {
            throw {
              status: 400,
              message: "User already invited in project"
            };
          } else if (!response) {
            return Project.findByIdAndUpdate(
              {
                _id: idProject
              },
              {
                $push: {
                  pendingMember: idMember
                }
              },
              {
                new: true
              }
            );
          }
        })
        .then(response => {
          res.status(200).json({
            response,
            message: "success add member to project"
          });
        })
        .catch(next);
    } else {
      const { email } = req.body;
      User.findOne({
        email
      })
        .then(response => {
          // console.log(response);
          if (!response) {
            throw {
              status: 404,
              message: "User not found"
            };
          } else {
            idMember = new ObjectId(response._id);
            return Project.findByIdAndUpdate(
              {
                _id: idProject
              },
              {
                $pull: {
                  member: idMember
                }
              },
              {
                new: true
              }
            );
          }
        })
        .then(response => {
          // console.log(response);
          if (response) {
            res.status(200).json({
              response,
              message: "success kick member from project"
            });
          } else {
            throw {
              status: 400,
              message: "user not in project"
            };
          }
        })
        .catch(next);
    }
  }
  //END ADMIN
  //all in project

  //end all in project
  //MEMBER
  static accOrDec(req, res, next) {
    let idProject = req.params.idProject;
    if (req.params.edit === "acc") {
      Project.findByIdAndUpdate(
        idProject,
        {
          $push: {
            member: req.decoded.id
          },
          $pull: {
            pendingMember: req.decoded.id
          }
        },
        {
          new: true
        }
      )
        .then(response => {
          res.status(200).json({
            response,
            message: "you join the project"
          });
        })
        .catch(next);
    } else {
      Project.findByIdAndUpdate(
        idProject,
        {
          $pull: {
            pendingMember: req.decoded.id
          }
        },
        {
          new: true
        }
      ).then(response => {
        res.status(200).json({
          response,
          message: "You Decline Invitation Project"
        });
      });
    }
  }

  static invitation(req, res, next) {
    let id = new ObjectId(req.decoded.id);
    Project.find({
      pendingMember: {
        $in: [id]
      }
    })
      .then(response => {
        if (response.length > 0) {
          res.status(200).json(response);
        } else {
          throw {
            status: 404,
            message: "no have invitation project"
          };
        }
      })
      .catch(next);
  }
  //END MEMBER

  //CRUD in PROJECT
  static getAllProject(req, res, next) {
    let id = new ObjectId(req.decoded.id);
    Project.find({
      member: {
        $in: [id]
      }
    })
      .then(response => {
        if (response.length > 0) {
          res.status(200).json(response);
        } else {
          throw {
            status: 400,
            message: "No have Project"
          };
        }
      })
      .catch(next);
  }

  static seeProject(req, res, next) {
    let idProject = req.params.idProject;
    Project.findById(idProject)
      .populate("member")
      .populate("todo")
      .then(response => {
        res.status(200).json(response);
        // console.log(response);
      })
      .catch(next);
  }

  static addTodo(req, res, next) {
    let idProject = req.params.idProject;
    const { name, description, due } = req.body;
    Todo.create({
      name,
      description,
      due,
      user: idProject
    })
      .then(response => {
        return Project.findByIdAndUpdate(
          idProject,
          {
            $push: {
              todo: response._id
            }
          },
          {
            new: true
          }
        );
      })
      .then(response => {
        res.status(200).json({
          response,
          message: "success add todo in this project"
        });
      })
      .catch(next);
  }

  static getOneTodo(req, res, next) {
    let idProject = req.params.idProject;
    let idTodo = req.params.idTodo;
    Project.findById({
      _id: idProject
    })
      .populate("todo")
      .then(response => {
        if (!response) {
          throw {
            status: 404,
            message: "Project not found"
          };
        } else {
          let todos = response.todo;
          todos.forEach(todo => {
            if (todo._id == idTodo) {
              res.status(200).json(todo);
            }
          });
        }
      })
      .catch(next);
  }
  //end crud

  static updateAll(req, res, next) {
    let idTodo = req.params.idTodo;
    const { name, description, due, status } = req.body;
    Todo.findByIdAndUpdate(idTodo, { name, description, due, status })
      .then(response => {
        res.status(200).json({
          response,
          message: "success update todo project"
        });
      })
      .catch(next);
  }

  static updateStatus(req, res, next) {
    console.log("masuk");
    let idTodo = req.params.idTodo;
    const { status } = req.body;
    Todo.findByIdAndUpdate(idTodo, { status })
      .then(response => {
        console.log(response);
        res.status(200).json({
          response,
          message: "success update todo project"
        });
      })
      .catch(next);
  }

  static removeTodoProject(req, res, next) {
    Todo.deleteOne({
      _id: req.params.idTodo
    })
      .then(response => {
        res.status(200).json({
          message: "Success delete todo in project!"
        });
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = ProjectController;
