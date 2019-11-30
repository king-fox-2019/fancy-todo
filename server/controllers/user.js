const User = require('../models/user')
const Password = require('../helpers/hashPassword')
const jwt = require('../helpers/jwtHandler')

class UserController{
    static registerUser(req,res,next){
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(user){
                next({
                    status: 400,
                    message: 'Your email is already registered'
                })
            }else{
                return User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
            }
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            next(err)
        })
    }

    static loginUser(req,res,next){
        User.findOne({
            email: req.body.email
        })
        .then(user=>{
            if(user){
                let valid = Password.compare(req.body.password, user.password)
                if(valid){
                    let token = jwt.generateToken({id: user._id})
                    res.status(200).json({
                        user,
                        token
                    })
                }else{
                    next({
                        status: 400,
                        message: 'Your password is wrong'
                    })
                }
            }else{
                next({
                    status: 400,
                    message: 'Your email is not registered'
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static getAllUser(req,res,next){
        User.find()
            .then(users => {
                let usersFilter = []
                users.forEach( data =>{
                    let obj = {}
                    obj._id = data._id
                    obj.username = data.username
                    obj.email = data.email
                    usersFilter.push(obj)
                })
                res.status(200).json(usersFilter)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOneUser(req,res,next){
        User.findById(req.params.id)
            .then(user => {
                if(user){
                    let filterUser = {
                        username: user.username,
                        email: user.email
                    }
                    res.status(200).json(filterUser)
                }else{
                    next({
                        status: 400,
                        message: 'Your username id is not valid'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static loginGoogle(req,res,next){
        User.findOne({
            email: req.user.email
        })
        .then(user => {
            if(user){
                let token = jwt.generateToken({id: user._id})
                let newUser = {
                    username: user.username,
                    email: user.email
                }
                res.status(200).json({
                    user: newUser,
                    token
                })
            }else{
                let userPass = process.env.DEFAULT_PASSWORD
                return User.create({
                    username: req.user.given_name,
                    email: req.user.email,
                    password: userPass
                })
            }
        })
        .then(user => {
            if(user){
                let objUser = {
                    username: user.username,
                    email: user.email
                }
                let token = jwt.generateToken({id: user._id})
                res.status(200).json({
                    user: objUser,
                    token
                })
            }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = UserController