if(process.env.NODE_ENV == 'development') require('dotenv').config

const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 3000
const morgan = require('morgan')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))

app.listen(port, () => console.log(`listening on port ${port}`))

const mongoose = require('mongoose')
const URI = `mongodb://localhost:27017/fancytodo`
const router = require('./routers')

mongoose.connect(URI, {
   useNewUrlParser: true,
   useFindAndModify: false,
   useUnifiedTopology: true
})
.then(() => console.log(`connected to mongodb`))
.catch(err => console.log(`connection to mongodb failed\n`, err))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', router)