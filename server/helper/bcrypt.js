const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function hashPassword(password) {
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function compare(inputPassword, databasePassword) {
    return bcrypt.hashSync(inputPassword, databasePassword)
}

module.exports = {
    hashPassword,
    compare
}