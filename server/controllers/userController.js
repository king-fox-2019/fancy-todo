'use strict';
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
const passwordRandomGenerator = require('../helpers/passwordGenerate');


class UserController {
    static registerUser(req, res, next) {    
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }      
        User.create(userData)
            .then(result=> {
                res.status(201).json(result)
            })
            .catch(next)
    }
    static googleLogin(req, res, next) {
        let token = req.body.idToken
        client
            .verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENTID
            })
            .then(ticket=> {
                const { name, email, } = ticket.getPayload()
                User
                    .findOne( { email: email } )
                    .then(user=> {
                        if(!user) {
                            let passwordRandom = passwordRandomGenerator()
                            console.log(passwordRandom)
                            User
                                .create({
                                    name,
                                    email,
                                    password: passwordRandom
                                })
                                .then(user=> {
                                    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
                                    res.json(token)
                                })
                                .catch(next)
                        } else {
                            const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
                            res.json(token)
                        }
                    })
                    .catch(next)
            })
            .catch(next)
    }
    static login(req, res, next) {
        console.log(req.body)
        User
            .findOne({ email: req.body.email })
            .then(user=> {
                if(!user) {
                    res.status(404).json('Your email hasn\'t resgistered yet.')
                } else {
                    console.log('masuk else?')
                    bcrypt.compare(req.body.password, user.password, (err, status)=> {
                        if(err) {
                            res.status(500).json(err)
                        }
                        else {
                            if(!status) {
                                res.status(403).json('Email / Password is Wrong')
                            }
                            else {
                                const token = jwt.sign({ id:user.id, name: user.name }, process.env.JWT_SECRET)
                                console.log('masuk')
                                res.status(202).json(token)
                            }
                        }
                    })
                }
            })
            .catch(next)
    }
}

module.exports = UserController;