'use strict'

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

function googleVerify(req, res, next) {
  let token = req.body.id_token
  client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  })
    .then(ticket => {
      const payload = ticket.getPayload()
      req.decoded = payload
      next()
    })
    .catch(next)
}

module.exports = googleVerify
