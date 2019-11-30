const Project = require('../models/project')
const User = require('../models/user')

function authorization(req,res,next){
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user){
            req.user = user
            next()
        }else{
            next({
                status: 400,
                message: 'There is no user with that email'
            })
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization