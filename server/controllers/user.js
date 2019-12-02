const User = require('../models/User');
const bcrypt = require('../helpers/bcrypt');
const session = require('../helpers/session');

class UserController {
    static signup(req, res, next) {
        const { name, email, password } = req.body;
        User.findOne({
            email
        })
            .then(user => {
                if (user) {
                    let err = {
                        status: 400,
                        msg: "Email user is already registered!"
                    }
                    next(err);

                } else {
                    User
                    .create({
                        name,
                        email,
                        password
                    })
                    .then( data => {
                        res.status(201).json(data);
                    })
                    .catch( err => {
                        next(err);
                    })
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static signin(req, res, next) {
        const { email, password } = req.body;
        User
            .findOne({
                email
            })
            .then( user => {
                if (!req.body.email || !req.body.password) {
                    let err = {
                        status: 400,
                        msg: 'Bad Request'
                    }
                    next(err);
                }
                if(user) {
                    if (bcrypt.compare(password, user.password)) {
                        let token = session.encode({id: user.id, email: user.email, isAdmin: user.isAdmin});
                        res.status(200).json({
                            token,
                            name: user.name,
                            email: user.email
                        });
                    } else {
                        let err = {
                            status: 404,
                            msg: 'Invalid Email/Password'
                        }
                        next(err);
                    }
                } else {
                    let err = {
                        status: 404,
                        msg: 'Invalid Email/Password'
                    }
                    next(err);
                }
            })
            .catch( err => {
                next(err);
            })
    }


    static showAll(req, res, next) {
        User
            .find({})
            .select('email')
            .then( datas => {
                res.status(200).json(datas);
            })
            .catch( err => {
                next(err);
            })
    }

    static googleSign(req, res, next) {
        client
			.verifyIdToken({
				idToken: req.body.id_token,
				audience: process.env.GOOGLE_CLIENT_TOKEN
			})
			.then(ticket => {
				const payload = ticket.getPayload();
				User.findOne({ email: payload.email }).then(user => {
					if (user) {
						res.status(200).json({
                            token : jwt({id: user.id, email: user.email})
						});
					} else {
						req.body.email = payload.email;
						UserController.register(req, res, next);
					}
				});
			})
			.catch(next);
    }
}

module.exports = UserController;