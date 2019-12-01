'use strict';
const errMessage = require('../helpers/errMessage');

module.exports = (err, req, res, next) => {
    let status = err.status || 500
    let message = err.message || 'Internal Server Error'
    
    if(err.code == 11000 && err.keyValue.email) {
        status = 400
        message = 'Email already Taken'
    }
    let errorData = {
        code: status,
        message: message
    }
    res.status(status).json(errorData)
}