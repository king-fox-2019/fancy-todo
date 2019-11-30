if(process.env.NODE_ENV === "development"){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes')
const connection = require('./configs/connection')

connection()

app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cors())
app.use(router)

app.listen(PORT,() => console.log("Listening to the port " + PORT))