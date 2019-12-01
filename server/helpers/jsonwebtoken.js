const jwt =  require('jsonwebtoken');

class tokenGenerator{
    static generateToken(payload){
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        return token
    }
    static verifyToken(token){
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        return payload
    }
}

module.exports = tokenGenerator