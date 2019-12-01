const User = require("../models/user");
const { comparePassword } = require("../helpers/bcrypt");
const { getToken } = require("../helpers/jwt");

class UserController {
  static signup(req, res, next) {
    const { name, email, password } = req.body;
    User.create({
      name,
      email,
      password
    })
      .then(response => {
        res.status(201).json({
          response,
          message: "success signup"
        });
      })
      .catch(next);
  }

  static signin(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      email
    })
      .then(response => {
        if (!response) {
          throw {
            status: 404,
            message: "Username / Password is Wrong!"
          };
        } else {
          if (password === "" || password === null) {
            throw {
              status: 400,
              message: "password required"
            };
          } else {
            if (!comparePassword(password, response.password)) {
              throw {
                status: 400,
                message: "Username / Password is Wrong!"
              };
            } else {
              let payload = {
                id: response._id,
                email: response.email,
                name: response.name
              };
              let token = getToken(payload);
              res.status(200).json({
                token,
                message: "success signin"
              });
            }
          }
        }
      })
      .catch(next);
  }

  static googleSignin(req, res, next) {
    User.findOne({
      email: req.decoded.email
    })
      .then(response => {
        if (response) {
          return response;
        } else {
          return User.create({
            name: req.decoded.name,
            email: req.decoded.email,
            password: process.env.DEFAULT_PASSWORD
          });
        }
      })
      .then(response => {
        let payload = {
          id: response._id,
          name: response.name,
          email: response.email
        };
        let token = getToken(payload);
        res.status(201).json({
          token,
          message: "success signin via google"
        });
      })
      .catch(next);
  }
}

module.exports = UserController;
