const User = require('../models/user')
const { checkPass } = require('../helpers/bcrypt')
const { genToken } = require('../helpers/token')
// const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.Client_ID);

class Controller {

    static googleOAuth(req, res, next) {
        let name, email;
        client
            .verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.Client_ID
            })
            .then(ticket => {
                // send token to client
                name = ticket.getPayload().name;
                email = ticket.getPayload().email;
                return User.findOne({email: email})
                // const token = genToken({ name, email })
                // res.json(token)
            })
            .then((user)=>{
                if(!user){
                    return User.create({
                        username: name,
                        email: email,
                        password: email
                    })
                }else{
                    return user
                }
            })
            .then((user)=>{
                let token = genToken({ id: user.id, name: user.username })
                    res.status(200).json({ token })
            })
            .catch(next)
    };

    static register(req, res, next) {
        // console.log(req.body)
        const { username, email, password } = req.body
        const obj = { username, email, password }
        User.create(obj)
            .then((data) => {
                // console.log(data)
                let token = genToken({ id: data.id, name: data.username })
                res.status(200).json({ token })
                // res.status(201).json(data)
            })
            .catch(next);
    }

    static login(req, res, next) {
        // console.log(req.body);
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user || user.length == 0) {
                    let err = {
                        status: 404,
                        msg: `Your email not match to any user's account`
                    }
                    next(err)
                }

                let check = checkPass(req.body.password, user.password)
                let token = ''

                if (check) {
                    token = genToken({ id: user.id, name: user.username })
                    res.status(200).json({ token })
                } else {
                    let err = {
                        status: 403,
                        msg: 'Password Incorrect'
                    }
                    next(err)
                }
            })
            .catch((next));
    }


    static list(req, res, next) {
        User.find()
            .then((data) => {
                // console.log(data)
                res.status(201).json(data)
            })
            .catch(next);
    }

}

module.exports = Controller