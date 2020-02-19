const jwt = require('jsonwebtoken')

function auth(req,res,next){
    jwt.verify(req.header.token,process.env.SECRET,function(err,token){
        if(token){
            next()
        }else{
            next({name:401,message:'you are not authorized'})
        }
    })
}

module.exports = auth