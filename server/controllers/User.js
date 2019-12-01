const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static getAll(req, res, next) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                next(err)
            })
    }
    static register(req, res, next) {
        let { name, email, password } = req.body
        User.create({ name, email, password })
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                next(err)
            })
    }
    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({ email: email })
            .then( user => {
                if(!user){
                    next({ status: 403, message: "invalid email or password" })
                } else {
                    if(compare(password, user.password)) {
                        const token = generateToken({ id: user._id })
                        res.status(200).json({ token })
                    } else {
                        next({ status: 403, message: "invalid password or email" })
                    }
                }
            })
    }
    static googleLogin(req, res, next) {
        const clientId = process.env.GOOGLE_CLIENT_ID
        let googelPayload = ''
        const client = new OAuth2Client(clientId)
        client.verifyIdToken({
            idToken: req.body.token,
            audience: clientId
        })
            .then(ticket => {
                googelPayload = ticket.getPayload()
                return User.findOne({
                    email: googelPayload.email
                })
            })
            .then(user => {
                if(user) {
                    return user
                }
                else {
                    User.create({
                        name: googelPayload.name,
                        email: googelPayload.email,
                        isGoogle: true,
                        password: process.env.DEFAULT_PASSWORD || "google"
                    })
                }
            })
            .then( user => {
                const token = generateToken({ id: user.id })
                res.status(200).json({ token })
            })
            .catch(next)

    }
}

module.exports = UserController