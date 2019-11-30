const jwt = require('../helpers/jsonwebtoken')

module.exports = (req,res,next) => {
    try {
        const payload = jwt.verifyToken(req.headers.access_token)
        console.log(payload)
        req.payload = payload
        next()
    } catch(err) {
        console.log(err)
        res.json(err)
        // next(err)
    }
}