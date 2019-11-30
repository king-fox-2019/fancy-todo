if (process.env.NODE_ENV === 'development') require('dotenv').config()


const express = require('express')
const app = express()
const port = process.env.PORT


app.get('/', function(request, response, next) {
  response.send('Server Online!')
})


app.listen(port, () => console.log('Listening on port', port))
