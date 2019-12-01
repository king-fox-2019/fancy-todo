if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config()
}

require('./config/mongoose')
const express = require('express'), 
    app = express(),
    port = process.env.PORT || 3001,
    router = require('./routes'),
    errorHandler = require('./middlewares/errorHandler'),
    cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

app.use(errorHandler)

app.listen(port, () => console.log('Listened on : ', port))