'use strict';
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


class UserController {
    static registerUser(req, res, next) {            
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
            .then(result=> {
                res.status(201).json(result)
            })
            .catch(err=> {
                // throw to errHandling
                console.log(err)
                res.status(500).json(err)
            })
    }
    static login(req, res, next) {
        User
            .findOne({ email: req.body.email })
            .then(user=> {
                bcrypt.compare(req.body.password, user.password, (err, status)=> {
                    if(err) {
                        res.status(500).json(err)
                    }
                    else {
                        if(!status) {
                            res.status(403).json('Email / Password salah')
                        }
                        else {
                            const token = jwt.sign({name: user.name, email: user.emit}, process.env.JWT_SECRET)
                            res.status(200).json(token)
                        }
                    }
                })
            })
            .catch(err=> {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController;