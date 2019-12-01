if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const option = {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
}

mongoose.connect(process.env.MONGO_URI, option)
  .then(() => {
    console.log(`Connected to MongoDB`)
  }, (err) => {
    console.log(`Cannot connect to MongoDB`)
  })

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use(routes)

app.use('*', () => {
  throw new Error(`Unhandled path`)
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})