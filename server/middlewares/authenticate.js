const jwt = require('../helpers/jwtHandler')

function authenticate(req,res,next){
    try{
        const decoded = jwt.verifyToken(req.headers.access_token)
        req.decoded = decoded
        next()
    }catch(err){
        next(err)
    }
}

module.exports = authenticate