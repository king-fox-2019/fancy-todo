'use strict'

module.exports = (err, req, res, next) => {
  console.log(err.name)
  // console.log(err.message)
  // console.log(err)

  let status, message
  switch (err.name) {
    case "ValidationError":
      status = 422
      message = err.message
      break;

    case "SyntaxError":
      status = 401
      message = err.message
      break;

    case "JsonWebTokenError":
      status = 401
      message = "Invalid Access Token"
      break;

    default:
      status = err.status || 500
      message = err.message || 'Internal Server Error'
      break;
  }

  res.status(status).json({ message })

}