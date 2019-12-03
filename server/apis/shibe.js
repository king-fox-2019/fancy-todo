const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://shibe.online/api/'
})

module.exports = instance