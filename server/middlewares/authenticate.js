const verifyToken = require('../helpers/verifyToken')
const User = require('../models/User')

module.exports = (req, res, next) => {
  let access_token = req.headers.access_token
  // console.log('ini access token di authenticate', access_token);
  const decoded = verifyToken(access_token)
  // console.log('ini decoded di authenticate', decoded);

  if (!access_token || !decoded) {
    throw {
      name: 'Unauthorized',
      status: 401,
      message: 'Unauthorized access!'
    }
  } else {
    User
      .findOne({ email: decoded.payload })
      .then(user => {
        // console.log('ini user di authenticate', user);
        if (!user) {
          throw {
            name: 'Unauthorized',
            status: 401,
            message: 'Unauthorized access!'
          }
        } else {
          req.loggedUser = {
            id: user._id,
            email: user.email,
            name: user.name
          }
          next()
        }
      })
      .catch(next)
  }
}