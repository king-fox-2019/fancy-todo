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
}

module.exports = UserController;
