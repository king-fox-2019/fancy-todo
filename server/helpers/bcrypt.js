const bcrypt = require('bcryptjs')

class hashPassword{
    static hash(password){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    }
    static compare(password,hash){
        return bcrypt.compareSync(password, hash);
    }
}

module.exports = hashPassword