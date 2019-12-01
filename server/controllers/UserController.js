const User = require('../models/user')
const jsonwebtoken = require('../helpers/jsonwebtoken')
const bcrypt = require('../helpers/bcrypt')
const passwordGenerator = require('../helpers/passwordGenerator')

class UserController {
    static register(req,res,next){
        const values = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        User
            .create(values)
            .then(user => {
                const payload = {
                    _id : user._id
                }
                const token = jsonwebtoken.generateToken(payload)
                res.status(201).json({token})
            })
            .catch(err => {
                res.json(err)
            })
    }
    static login(req,res,next){
        const condition = {
            email : req.body.email
        }
        User
            .findOne(condition)
            .then((user) => {
                if(user){
                    const password = req.body.password
                    if(bcrypt.compare(password,user.password)){
                        const payload = {
                            _id : user._id
                        }
                        const token = jsonwebtoken.generateToken(payload)
                        res.status(200).json({token})
                    }else{
                        res.status(400).json({message : "Wrong password"})
                    }
                }
                else{
                    res.status(400).json({message : "User not found"})
                }
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).json({message : "Internal server error"})
            })
    }
    static googleLogin(req,res,next){
        const condition = {
            email : req.decoded.email
        }
        User
            .findOne(condition)
            .then((user) => {
                if(user){
                    const payload = {
                        _id : user._id
                    }
                    const token = jsonwebtoken.generateToken(payload)
                    res.status(200).json({token})
                }
                else{
                    const values = {
                            name : req.decoded.name,
                            email : req.decoded.email,
                            password : passwordGenerator()
                    }
                    return User
                        .create(values)
                  
                }
            })
            .then(user => {
                const payload = {
                    _id : user._id
                }
                const token = jsonwebtoken.generateToken(payload)
                res.status(201).json({token})
            })
            .catch((err)=>{
                res.status(500).json({message : "Internal server error"})
            })
    }
}

module.exports = UserController