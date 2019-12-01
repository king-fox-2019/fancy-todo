function randPassword()
{
    const passwordLength = Math.max(5, Math.round( Math.random() * 10 ))
    console.log("TCL: passwordLength", passwordLength)
    
    
    const dictionary = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    
    let randPassword = ''
    
    for (let x = 0; x < passwordLength; x++)
      {
        randPassword += dictionary[Math.round( Math.random()*dictionary.length  )]
      }
    
    return randPassword
}


module.exports = randPassword