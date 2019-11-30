'use strict';
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('Authorization!', req.headers.token)
    Todo
        .findOne({ _id: req.body.id })
        .populate('userId')
        .then(todo=> {
            jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded)=> {
                let { id } = decoded
                if(todo.userId._id == id) {
                    console.log('green')
                    next()
                } else {
                    console.log('red')
                    next({ status: 401, message: 'Only Owner can modified todo!' })
                }
            })
        })
        .catch(next)
}