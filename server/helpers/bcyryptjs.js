const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(5)

function hashingPassword(password)
  {
    console.log('random password nih', password)
    return bcryptjs.hashSync(password,salt)
  }

function checkingPassword(enteredPassword, storedHash)
  {
    console.log('lagi checking nih')
    return bcryptjs.compareSync(enteredPassword, storedHash)
  }


module.exports =  
{
    hashingPassword,
    checkingPassword
}