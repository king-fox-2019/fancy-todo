'use strict';
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.headers.token) {
        jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded)=> {
            if(err) console.log(err)
            req.decoded = decoded
            next()
        })
    } else {
        next({status: 400, message: "You have to login first!"})
    }
}