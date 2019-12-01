const { verify } = require('../helpers/token')

function authentication(req, res, next) {
    try {
        req.decode = verify(req.headers.id_token)
        console.log(req.decode);
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", err: error })
    }
}

module.exports = authentication