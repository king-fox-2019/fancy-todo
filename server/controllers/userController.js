const { User } = require("../models")

class userController {
    static addUser(req, res, next) {
      const { username, email, password } = req.body;
      User.create({ username, email, password })
        .then(user => {
          res.status(200).json(user);
        }).catch(next)
    }
    
    static showUsers(req, res, next) {
      User.find({})
        .then(users => {
          res.status(200).json(users);
        }).catch(next)
    }

    static showUser(req, res, next) {
      User.findById(req.params.userId)
        .then(user => {
          res.status(200).json(user);
        }).catch(next);
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
      const userId = req.params.userId;
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