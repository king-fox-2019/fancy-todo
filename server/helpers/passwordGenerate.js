module.exports = () => {
    let password = ''
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for(let i = 0; i < 7; i++) {
        password += characters[Math.floor(Math.random()*charactersLength)]
        
    }
    return password
}

