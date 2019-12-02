'use strict'

const User = require('../models/user')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserCon {

    static register (req, res, next){
    const {name,email,password} = req.body
    User.create({name,email,password})
    .then(user=>{
        res.status(201).json(user.name)
    })
    .catch(err=>{
        next(err)
    })
    }

    static login(req,res,next){
        User.findOne({ 
            email : req.body.email
        })
        .then(user => {       
            if (user) {     
                let valid = comparePassword(req.body.password,user.password)
                if ( valid ) {               
                    let token = generateToken(user)  
                    let {email,_id} = user
                    res.json({
                        message : 'login succes',
                        token : token,
                        user : {
                            email,
                            _id
                        }                        
                    })
                } else {                    
                    next({
                        status: 403,
                        message: 'Wrong Password'
                    })
                }
            } else {
                next({
                    status : 404,
                    message : 'user not found'
                })
            } 
        })
        .catch(next)
    }

    static findAll(req, res, next){
        User.find()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static loginGoogle(req, res, next) { 
        let  email = req.body.email
        User.findOne({
            email : email
        })
        .then( user => {
            let password = email+'tes'
            if (!user) {
                return User.create({
                    name:email,
                    email:email, 
                    password})
            } else {
                return user
            }
        })
        .then(user => {      
            let {email,_id} = user      
            let token = generateToken(user)  
            res.json({
                status : 200,
                message : 'login success',
                token : token,
                user : {
                    email,
                    _id
                }  
            })                     
        })
        .catch(next)                    
    }    

    static findOne(req,res,next){
        res.status(200).json(req.user)
    }
}

module.exports = UserCon