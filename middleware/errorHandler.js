'use strict'

module.exports = (err, req, res, next) => {
  console.log(err.status)
  console.log(err.message)
  console.log(err._message)

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

    default:
      status = err.status || 500
      message = err.message || 'Internal Server Error'
      break;
  }

  res.status(status).json({ message })

}