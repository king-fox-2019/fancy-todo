const jwt = require('../helpers/jsonwebtoken')

module.exports = (req,res,next) => {
    try {
        const payload = jwt.verifyToken(req.headers.access_token)
        req.payload = payload
        next()
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
        // next(err)
    }
}