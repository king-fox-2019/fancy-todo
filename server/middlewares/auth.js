const { verifyToken } = require("../helpers/jwt");
const Todo = require("../models/todo");
const Project = require("../models/project");

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
        if (response.admin == req.decoded.id) {
          next();
        } else if (response.member) {
          let findMember = response.member.filter(member => {
            return member === req.decoded.id;
          });
          if (findMember.length != 0) {
            next();
          } else {
            throw {
              status: 404,
              message: "You not a member in this project"
            };
          }
        }
      }
    })
    .then(response => {})
    .catch(next);
}

module.exports = {
  authentication,
  authorizationTodo,
  authorizationAdmin,
  authorizationCrudProject
};
