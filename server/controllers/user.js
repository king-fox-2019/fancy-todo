const User = require('../models/User')
const Project = require('../models/Project')
const googleVerify = require('../helpers/googleVerify')
const generateToken = require('../helpers/generateToken')
const verifyHash = require('../helpers/verifyHash')

class ControllerUser {
  static register(req, res, next) {
    let { name, email, password } = req.body
    User
      .create({
        name, email, password
      })
      .then(user => {
        const access_token = generateToken(email)
        res.status(200).json({ user, access_token })
      })
      .catch(next)
  }

  static login(req, res, next) {
    let { email, password } = req.body
    User
      .findOne({ email })
      .then(user => {
        let passwordMatch = null

        if (user) {
          passwordMatch = verifyHash(password, user.password)

          if (passwordMatch) {
            const access_token = generateToken(email)
            res.status(200).json({ access_token, user })
          }
        }
        if (!user || !passwordMatch) {
          throw {
            name: 'BadRequest',
            status: 400,
            message: 'Wrong email/password!'
          }
        }
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    let { googleIdToken } = req.body
    // console.log('ini googleIdToken', googleIdToken);
    let userTicket = {}

    googleVerify(googleIdToken)
      .then(ticket => {
        userTicket = ticket.payload

        return User.findOne({
          email: userTicket.email
        })
      })
      .then(user => {
        if (user) {
          const access_token = generateToken(userTicket.email)
          // console.log('1 >>> ini access token yg digenerate', access_token);
          return res.status(200).json({ access_token })
        } else {
          return User.create({
            name: userTicket.name,
            email: userTicket.email,
            password: process.env.DEFAULT_USER_PASSWORD
          })
            .then(() => {
              const access_token = generateToken(userTicket.email)
              // console.log('2 >>> ini access token yg digenerate', access_token);
              return res.status(200).json({ access_token })
            })
        }
      })
      .catch(next)
  }

  static fetchOne(req, res, next) {
    User
      .findById(req.loggedUser.id)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }

  static fetchNotifications(req, res, next) {
    User
      .findById(req.loggedUser.id)
      .then(user => {
        res.status(200).json(user.notifications)
      })
      .catch(next)
  }

  static acceptProjectInvitation(req, res, next) {
    let acceptingUser = {}
    User
      .findOne({
        _id: req.loggedUser.id, 'notifications.projectId': req.params.projectId
      })
      .then(({ notifications }) => {
        // console.log('ini notification pas accept', notification);
        if (notifications[0].addressed) throw {
          name: 'Forbidden',
          status: 403,
          message: 'Notification has already been addressed!'
        }
        return User
          .findOneAndUpdate({
            _id: req.loggedUser.id
          }, {
            '$pull': {
              'notifications': {
                'projectId': req.params.projectId
              }
            }
          }, { new: true })
      })
      .then(user => {
        acceptingUser = user

        return Project
          .findByIdAndUpdate(req.params.projectId, {
            '$push': {
              'members': req.loggedUser.id
            }
          }, { new: true })
      })
      .then(project => {
        res.status(200).json({
          message: 'Accepted project invitation!', acceptingUser, project
        })
      })
      .catch(next)
  }

  static declineProjectInvitation(req, res, next) {
    User
      .findOne({
        _id: req.loggedUser.id, 'notifications.projectId': req.params.projectId
      })
      .then(( response ) => {
        // notifications.forEach(notification => {
        //   if (notification.projectId === req.params.projectId) throw {
        //     name: 'Forbidden',
        //     status: 403,
        //     message: 'Notification has already been addressed!'
        //   }
        // })
        return User
          .findOneAndUpdate({
            _id: req.loggedUser.id
          }, {
            '$pull': {
              'notifications': {
                'projectId': req.params.projectId
              }
            }
          }, { new: true })
      })
      .then(user => {
        res.status(200).json({
          message: 'Declined project invitation!', user
        })
      })
      .catch(next)
  }
}

module.exports = ControllerUser

// {
//   '$set': {
//     'notifications.$.declined': true, 'notifications.$.addressed': true
//   }
// }