const JWToken = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const createJWToken = (userId) => {
    return JWToken.sign(
        {userId: userId},
        SECRET_KEY,
        {expiresIn: '2 days'}
    );
};

const verifyJWToken = (token) => {
    return JWToken.verify(token, SECRET_KEY);
};

module.exports = {
    createJWToken,
    verifyJWToken
};