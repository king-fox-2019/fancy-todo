const jwt = require('jsonwebtoken');
const bcryptjs = require('../helpers/bcryptjs.js');
const User = require('../models/User.js');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

console.log('=== UserController ===');

class UserController {
    static googleSignIn(req, res, next) {
            console.log('googleSignIn()');
            console.log('req.body.id_token => ',req.body.id_token);
            console.log('process.env.GOOGLE_CLIENT_ID => ',process.env.GOOGLE_CLIENT_ID);

        let googleUser;
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(( ticket ) => {
                    console.log('ticket.payload => ',ticket.payload);
                googleUser = ticket.payload;
                    console.log('googleUser => ',googleUser);
                return User.findOne({ email : googleUser.email });
            })
            .then(( user ) => {
                    console.log('user => ',user);
                if ( user ) {
                    let payload = {
                        id: user._id,
                        email: user.email,
                        password: 'defaultPasswordBuatBuat'
                    }
                    let token = jwt.sign(payload, process.env.JWT_SECRET)
                        console.log('token => ',token);
                    res.status(200).json({
                        message: 'Google Sign In Successful',
                        token: token,
                        userDetails : user
                    })
                } else {
                    return User.create({
                        firstName: googleUser.given_name,
                        lastName: googleUser.family_name,
                        email: googleUser.email,
                        password: 'defaultPasswordBuatBuat'
                    })
                }
            })
            .catch(next)
    }

    static login(req, res, next) {
            console.log('static login() =====');
            console.log('req.body => ',req.body);

        let user = ''
        User.findOne({ email : req.body.email })
            .then(( user ) => {
                if ( user ) {
                        console.log('user => ', user)
                    let compareResult = bcryptjs.compare(req.body.password, user.password);
                        console.log('compareResult =>', compareResult)
                    if ( !compareResult ) {
                        res.status(500).json({ message : 'Password is incorrect' })
                    } else {
                        let payload = {
                            id : user._id,
                            email: user.email,
                            name: user.name
                        }
                            console.log('payload => ',payload);
                        let token = jwt.sign(payload, process.env.JWT_SECRET)
                            console.log('token => ',token);
                        res.status(200).json({ message : 'Sign In Successful', token, payload })
                    }
                } else {
                        console.log("User Not Found")
                    res.status(404).json({ message : 'Email Not Found' })
                }
            })
            .catch(next)
    }

    static register(req, res, next) {
        console.log('static register()');
        console.log('req.body => ',req.body);

        User.create(req.body)
            .then((user) => {
                console.log('user => ',user);
                res.status(201).json({ message: 'Successfully register new user. Please Sign In First' })
            })
            .catch(next)
    }
}

module.exports = UserController