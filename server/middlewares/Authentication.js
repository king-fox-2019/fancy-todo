const jwt = require('../helpers/jwt.js');

const authentication = (req, res, next) => {
    console.log('authorization invoked');

    if(req.headers.token) {
        console.log('req.headers.token => ',req.headers.token);
        try {
            let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
            console.log('process.env.JWT_SECRET => ',process.env.JWT_SECRET);
            req.decoded = decoded;
            console.log('req.decoded => ', req.decoded)
            next();
        } catch(error) {
            console.log('error => ',error);
            res.status(400).json({ message: 'Invalid JWT Token' })
        }
    } else {
        console.log('req.headers.token is undefined');
        res.status(400).json({ message: 'Please Login First' })
    }
}

module.exports = authentication
