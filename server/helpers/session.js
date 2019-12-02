const jwt = require('jsonwebtoken');

module.exports = {
    encode: function(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    },
    verify: function(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}