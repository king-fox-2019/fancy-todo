"use strict"

const dictionary = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

module.exports = {
  generatePassword() {
    let password = '';
    for (let i = 0; i < 15; i++) {
      password += dictionary[Math.floor(Math.random()*62)];
    }
    return password;
  } 
}