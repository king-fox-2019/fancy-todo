const User = require('../models/user')
const Project = require('../models/project')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken, verifyToken } = require('../helpers/jwt')

class UserController {

    static create(req, res, next) {
        const { name, email, password } = req.body
        User.create({ name, email, password})
            .then( user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static showOne(req, res, next) {
        User.findById(req.loggedUser._id)
            .then( user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static signin(req, res, next) {
        const { identity, password } = req.body
        User.findOne({
            $or: [{name: identity}, {email: identity}]
        })
            .then(user => {
                if (!user) throw {message: 'Invalid email/password'}

                const passwordInput = password
                const passwordUser = user.password
                let isPassword = checkPassword(passwordInput, passwordUser)

                if (!isPassword) throw {message: 'Invalid email/password'}
                const payload = {
                    _id: user._id,
                    name: user.name,
                }
                let token = generateToken(payload)
                res.status(200).json({token})
            })
            .catch(next)
    }

    static googleSignIn(req, res, next) {
        const {name, email} = req.body
        User.findOne({
            email
        })
            .then(user => {
                if (!user) return User.create({name, email, password:process.env.SECRET})
                else return user
            })
            .then(user => {
                const payload = {
                    _id: user._id,
                    name: user.name,
                }
                let token = generateToken(payload)

                res.status(200).json({token})
            })
            .catch(next)
    }

    static updatePassword(req, res, next) {
        const password = req.body.password
        const _id = req.loggedUser._id
        User.findById(_id)
            .then(user => {
                user.password = password
                user.save()
                res.status(200).json(user)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const obj = req.body
        const _id = req.loggedUser._id
        User.findByIdAndUpdate({_id}, obj, {new: true})
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const _id = req.loggedUser._id
        User.findByIdAndDelete({_id})
            .then(() => {
                res.status(200).json({message: 'delete success'})
            })
            .catch(next)
    }
}

module.exports = UserController