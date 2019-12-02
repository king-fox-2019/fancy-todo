const {User} = require('../models/modelUser');
const {createBCryptHash, compareBCrypthash} = require('../helpers/bCrypt');
const {createJWToken, verifyJWToken} = require('../helpers/jsonWebToken');

class ControllerUser {
    static viewUser(req, res) {
        if (req.role === 'Admin') {
            User.find().then(response => {
                res.status(200).json({
                    data: response
                });
            }).catch(err => {
                res.send(500).json({
                    message: err
                });
            })
        } else {
            User.findOne({
                _id: req.user_id
            }).then(response => {
                res.status(200).json({
                    data: response
                });
            }).catch(err => {
                res.status(500).json({
                    message: err
                });
            })
        }
    }

    static createUser(req, res) {
        User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: createBCryptHash(req.body.password),
            role: "User"
        }).then(response => {
            res.status(201).json({
                message: "Todo successfully created",
                data: response
            });
        }).catch(err => {
            res.status(500).json({
                message: err
            });
        })
    }

    static login(req, res) {
        const errMessage = "User / password not found";
        User.findOne({
            $or: [
                {userName: req.body.userName},
                {email: req.body.userName}
            ]
        }).then(response => {
            if (response) {
                let isPasswordMatch = compareBCrypthash(
                    req.body.password,
                    response.password
                );
                if (isPasswordMatch) {
                    res.status(200).json({
                        token: createJWToken(
                            response._id,
                            response.email,
                            response.role
                        ), email: response.email
                    });
                } else {
                    throw errMessage;
                }
            } else {
                throw errMessage;
            }
        }).catch(err => {
            res.status(500).json({
                message: err
            });
        })
    };

    static loginGoogle(req, res) {
        let email = req.body.email;
        let userName = req.body.userName;
        User.findOne({
            email: email
        }).then(response => {
            if (response){
                res.status(200).json({
                    token: createJWToken(
                        response._id,
                        response.email,
                        response.role
                    ), email: response.email
                });
            } else {
                let password = Math.random().toString(36).substring(7);
                User.create({
                    userName: userName,
                    email: email,
                    password: createBCryptHash(password),
                    role: "User"
                }).then(response => {
                    res.status(200).json({
                        token: createJWToken(
                            response._id,
                            response.email,
                            response.role
                        ), email: response.email
                    });
                }).catch(err => {
                    res.status(500).json({
                        message: err
                    });
                })
            }
        }).catch(err => {
            res.status(500).json({
                message: err
            });
        })
    }

}

module.exports = ControllerUser;