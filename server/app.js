if(process.env.NODE_ENV==='development')
{
    require('dotenv').config()
}
require('./config/mongoose')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')


const app = express()
const port = process.env.PORT || 7000

// middleware
app.use(express.urlencoded( { extended:true } ))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// routing
app.use(router)



// errorHandler
app.use(errorHandler)





app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})