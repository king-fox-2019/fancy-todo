const User = require('../models/user')
const { hashPassword, verifyPassword } = require('../helpers/password')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController{

    static register(req,res,next){
        let fullname = `${req.body.name.split(' ')[0]}+${req.body.name.split(' ')[1]}`
        console.log(fullname)
        
        User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashPassword(req.body.password),
            profilePicture : req.body.profilePicture || `https://ui-avatars.com/api/?name=${fullname}`
        })
        .then(user => {
            let payload = {
                id : user._id
            }
            const token = generateToken(payload)
            console.log(user)
            res.status(200).json({accessToken : token})
        })
        .catch(err => {
            next({
                status : 400,
                message : 'email already registered'
            })
        })
    }

    static login(req,res,next){
        User.findOne({
            email : req.body.email
        })
        .then(user => {
            if(user && verifyPassword(req.body.password,user.password)){
                let payload = {
                    id : user._id
                }
                const token = generateToken(payload)
                res.status(200).json({accessToken : token})
            }else{
                throw {
                    status : 401,
                    message : 'wrong email/password'
                }
            }
        })
        .catch(next)
    }

    static loginGoogle(req,res,next){
    
        let id_token = req.body.id_token
        let payloadJWT
        let email
        let name
        let password = process.env.DEFAULT_PASSWORD
        let profilePicture

        client.verifyIdToken({
            idToken : id_token,
            audience : process.env.CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            email = payload.email
            name = payload.given_name + ' ' +  payload.family_name
            profilePicture = payload.picture

            return User.findOneAndUpdate({ email : email },{ profilePicture:profilePicture })
            .then(user => {
                if(user){
                    console.log(user,'from user')
                    payloadJWT = {
                        id: user._id
                    }
                    let token = generateToken(payloadJWT)
                    res.status(200).json({ accessToken : token })
                }else{
                    User.create({
                        name : name,
                        email : email,
                        password : hashPassword(password),
                        profilePicture : profilePicture
                    })
                    .then(newUser => {
                        console.log(newUser,'from new user')
                        payloadJWT = {
                            id: newUser._id
                        }
                        let token = generateToken(payloadJWT)
                        res.status(200).json({ accessToken : token })
                    })
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    static UserProfile(req,res,next){
        User.findById({
            _id : req.loggedUser.id
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            next()
        })
    }
}

module.exports = UserController