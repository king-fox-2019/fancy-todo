const bcrypt = require('bcryptjs')

function hash(password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function compare(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = { hash, compare }