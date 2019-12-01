if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const users = require('./routes/users')
const todos = require('./routes/todo')
const cors = require('cors')
const port = process.env.PORT || 3000
const errorhandler = require('./middleware/errorHandler')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fancytodo', {useNewUrlParser: true});

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())
app.use('/user',users)
app.use('/todo', todos)
app.use(errorhandler)

app.listen(port)