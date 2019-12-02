const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)


function googleLogin (request, response, next) {
  client.verifyIdToken({
    idToken: request.body.google_token,
    audience: process.env.CLIENT_ID
  })
    .then(function (ticket) {
      const payload = ticket.getPayload()
      request.payload = payload
      next()
    })
    .catch(function (err) {
      next({ name: 'InvalidGoogleToken', message: 'Invalid Google token' })
    })
}


module.exports = googleLogin
