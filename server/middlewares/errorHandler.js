"use strict"

// const validationErr = require('../helpers/validationErr');

module.exports = {
  errorHandler: function (error, req, res, next) {
    console.log(JSON.stringify(error, null, 2))
    console.log(error)
    let statusCode;
    let messageError = [];

    switch (error.name) {
      // case 'ValidationError':
      //   statusCode = 422;
      //   messageError = validationErr(error);
      //   break;
      case 'JsonWebTokenError':
        statusCode = 400;
        message = error.message;
        break;
      case 'Password incorrect':
        statusCode = 403;
        messageError = "This email address has already been registered"
        break;
      case 'MongoError':
        statusCode = 409;
        messageError = "This email is taken."
        break;
      default:
        statusCode = error.status || 500;
        messageError = error.msg || 'Internal Server Error';
        break;
    }

    res.status(statusCode).json({
        message: messageError
    })
  }
}