if(process.env.NODE_ENV === "development"){
    require('dotenv').config()
}

const port = process.env.PORT
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const { errorHandler } = require('./middlewares/errorHandler')
const routes = require('./routes')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fancy-todo',({ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,  useCreateIndex: true, }))

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cors())
app.use(morgan())

app.use('/', routes)
app.get('/',(req,res)=>{
    res.send('server are connected')
})

app.use(errorHandler)

app.listen(port,() => {
    console.log('listening from port',port)
})