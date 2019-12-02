const bcryptjs = require('bcryptjs');

module.exports = {
    hash : function(inputPassword) {
        console.log('hash')
        console.log('inputPassword => ',inputPassword);
        console.log(bcryptjs.hashSync(inputPassword, bcryptjs.genSaltSync(10)))
        return bcryptjs.hashSync(inputPassword, bcryptjs.genSaltSync(10))
    },
    compare : function(inputPassword, userPassword) {
            console.log('bcryptjs: compare()');
            console.log('inputPassword => ',inputPassword);
            console.log('userPassword => ',userPassword);
            console.log('bcryptjs.compareSync(inputPassword, userPassword): ', bcryptjs.compareSync(inputPassword, userPassword))
        return bcryptjs.compareSync(inputPassword, userPassword)
    }
}