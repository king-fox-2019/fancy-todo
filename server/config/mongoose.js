const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/todoapp', { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, err => {
    if(err) {
        console.log('Failed to connect database');
    } else {
        console.log('Connected to db');
    }
})

module.exports = mongoose