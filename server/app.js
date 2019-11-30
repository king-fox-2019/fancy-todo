if (process.env.NODE_ENV = 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT


app.listen(PORT,() => {console.log('listening at port:', PORT)})