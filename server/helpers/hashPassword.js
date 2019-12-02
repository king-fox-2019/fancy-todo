const bcrypt = require('bcryptjs')
const saltRound = 10

module.exports = {
    hash(password){
        let salt = bcrypt.genSaltSync(saltRound);
        let hash = bcrypt.hashSync(password, salt)
        return hash
    },
    compare(password, hashedPassword){
        let valid = bcrypt.compareSync(password, hashedPassword)
        return valid
    }
}