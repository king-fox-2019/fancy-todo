const {verifyJWToken} = require('../helpers/jsonWebToken');

const tokenChecking = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(401).json("You dont have authorized for this action");
    }
    let verifyToken = verifyJWToken(req.headers.token);
    req.user_id = verifyToken.userId;
    req.email = verifyToken.email;
    req.role = verifyToken.role;
    next();
};

module.exports = tokenChecking;