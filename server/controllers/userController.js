const { User } = require("../models");
const { hashPassword, verifyPassword } = require("../helpers/bcrypt");
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const { ObjectID } = require("mongodb")

class userController {
  static signup(req, res, next) {
    const { username, email, password } = req.body;
    User.create({ username, email, password })
    .then(user => {
        res.status(200).json(user);
    }).catch(next)
  }

  static signin(req, res, next) {
    const payload = {};
    let access_token = '';
    const { email, password } = req.body;
    User.findOne({ email })
    .then(user => {
      if (user) {
        console.log()
          if (verifyPassword(password, user.password)) {
            payload._id = user._id;
            payload.email = user.email;
            access_token = jwt.sign(payload, process.env.JWT_SECRET);
            res.status(200).json({ access_token, email })
          } else {
            throw { status: 401, message: "Invalid password"}
          }
        } else {
          throw { status: 401, message: "Email is not registered"}
        }
      }).catch(next)
    
  }

  static signinGoogle(req, res, next) {
    let gpayload = {};
    let payload = {};
    let access_token = '';
    client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload();
        return User.findOne({ email: payload.email })
      })
      .then(user => {
        if (user) {
          gpayload._id = user._id;
          gpayload.username = user.username;
          gpayload.email = user.email
          return user;
        } else {
          return User.create({
            email: payload.email,
            username: payload.name.split(' ').join('') + Date.now(),
            password: payload.jti,
            gSignIn: true
          })
        }
      })
      .then(user => {
        if (user) {
          access_token = jwt.sign(gpayload, process.env.JWT_SECRET);
          res.status(200).json({ access_token })
        } else {
          throw { status: 401, message: "Invalid email" }
        }
      })
      .catch(next)
  }
  
  static showUser(req, res, next) {
    User.find({})
      .then(users => {
        res.status(200).json(users);
      })
      .catch(next)
  }

  static editUser(req, res, next) {
    const userId = req.params.userId;
    const { username, email, password } = req.body;
    User.findByIdAndUpdate(userId, { username, email, password }, { runValidators: true, context: 'query' })
      .then(response => {
        res.status(200).json({ message: 'Updated' })
      }).catch(next);
  }

  static editUserSpecified(req, res, next) {
    const update = {};
    const { userId } = req.params;
    const { username, email, password } = req.body;
    if (username) update.username = username;
    if (email) update.email = email;
    if (password) update.password = password;
    User.findByIdAndUpdate(userId, update)
      .then(user => {
        res.status(200).json({ message: 'Updated' })
      }).catch(next);

  }

  static deleteUser(req, res, next) {
    const userId = req.params.userId;
    User.findByIdAndDelete(userId)
      .then(response => {
        return res.status(200).json({ message: 'Deleted' })
      }).catch(next({ status: 404, message: "User does not exist"}))
  }

}

module.exports = userController;