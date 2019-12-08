const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {hashPassword,checkPassword} = require('../helpers/hashPassword')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class userController{
    static register = (req,res,next) => {
        let password = hashPassword(req.body.password)
        User.create({
            name:req.body.name,
            email:req.body.email,
            password
        })
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(err=>{
            next(err)
        })
    }

    static signin = (req,res,next) => {
        User.findOne({email:req.body.email})
        .then(user=>{
            let userId = user._id
            let userEmail = user.email
            console.log(userEmail)
            console.log(userId)
            if(user){
                if(checkPassword(req.body.password,user.password)){
                    let token = jwt.sign({id:req.body.id},process.env.SECRET)
                    console.log(token)
                    res.status(200).json({token,userId,userEmail})
                }else{
                    throw({name:404,message:'wrong password'})
                }
            }else{
                throw({name:404,message:'no user found'})
            }
        })
        .catch(err=>{
            next(err)
        });
    }

    static googleSignIn = (req,res,next) => {
        let name,email
        client.verifyIdToken({
            idToken:req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket=>{
            name = ticket.getPayload().name
            email = ticket.getPayload().email
            return User.findOne({
                email:email,
            })
        })
        .then(user=>{
            if(user){
                return user
            }else{
                return User.create({
                    name,
                    email,
                    password:'google',
                    isGoogle:true
                })
            }
        })
        .then(user=>{
            let userId = user._id
            let userEmail = user.email
            let token = jwt.sign({id:user._id},process.env.SECRET)
            res.status(200).json({token,userId,userEmail})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = userController