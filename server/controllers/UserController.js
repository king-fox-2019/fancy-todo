const User = require('../models/user')
const jsonwebtoken = require('../helpers/jsonwebtoken')
const bcrypt = require('../helpers/bcrypt')

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
                        console.log(user)
                        res.status(401).json("password salah")
                    }
                }
                else{
                    res.status(401).json("user not found")
                }
            })
            .catch((err)=>{
                res.json(err)
                console.log(err)
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
                    console.log(user,'================================================================')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

module.exports = UserController