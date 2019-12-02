const { verifyToken } = require("../helpers/jwt");
const Todo = require("../models/todo");
const Project = require("../models/project");
const ObjectId = require("mongoose").Types.ObjectId;

function authentication(req, res, next) {
  try {
    let decoded = verifyToken(req.headers.token);
    req.decoded = decoded;
    next();
  } catch (err) {
    next(err);
  }
}

function authorizationTodo(req, res, next) {
  Todo.findById({
    _id: req.params.id
  })
    .then(response => {
      if (response) {
        if (response.user == req.decoded.id) {
          next();
        } else {
          throw {
            status: 401,
            message: "Unauthorized User"
          };
        }
      } else {
        throw {
          status: 404,
          message: "Todo is Not Found"
        };
      }
    })
    .catch(next);
}

function authorizationAdmin(req, res, next) {
  Project.findOne({
    _id: req.params.idProject
  })
    .then(response => {
      if (!response) {
        throw {
          status: 404,
          message: "Project is Not Found"
        };
      } else {
        // let id = new ObjectId(req.decoded.id);
        if (response.admin == req.decoded.id) {
          next();
        } else {
          throw {
            status: 401,
            message: "You not Admin for this Project"
          };
        }
      }
    })
    .catch(next);
}

function authorizationCrudProject(req, res, next) {
  let id = new ObjectId(req.decoded.id);
  Project.findOne({
    _id: req.params.idProject
  })
    .then(response => {
      if (!response) {
        throw {
          status: 404,
          message: "Project is Not Found"
        };
      } else {
        return Project.findOne({
          member: {
            $in: [id]
          }
        });
      }
    })
    .then(response => {
      if (response) {
        next();
      } else {
        throw {
          status: 404,
          message: "You not a member in this project"
        };
      }
    })
    .catch(next);
}

module.exports = {
  authentication,
  authorizationTodo,
  authorizationAdmin,
  authorizationCrudProject
};
