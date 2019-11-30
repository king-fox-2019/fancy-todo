const Project = require("../models/project");
const User = require("../models/user");
const Todo = require("../models/todo");

class ProjectController {
  //ADMIN
  static createProject(req, res, next) {
    const { name, description } = req.body;
    Project.create({
      name,
      description,
      admin: req.decoded.id
    })
      .then(response => {
        res.status(201).json({
          response,
          messsage: "success create project"
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
    if (req.params.edit === "add") {
      let idMember;
      const { email } = req.body;
      User.findOne({
        email
      })
        .then(response => {
          //response user
          if (!response) {
            throw {
              status: 404,
              message: "User not found"
            };
          } else {
            idMember = response._id;
            return Project.findOne({
              pendingMember: response._id
            });
          }
        })
        .then(response => {
          //respone project
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
      const { memberId } = req.body;
      Project.findByIdAndUpdate(
        idProject,
        {
          $pull: {
            member: memberId
          }
        },
        { new: true }
      )
        .then(response => {
          res.status(200).json({
            response,
            message: "success kick member from this project"
          });
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
  //END MEMBER

  //CRUD in PROJECT
  static seeProject(req, res, next) {
    let idProject = req.params.idProject;
    Project.findById(idProject)
      .populate("member")
      .then(response => {
        res.status(200).json(response);
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
  //end crud
}

module.exports = ProjectController;
