const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/fancytodosKING'

module.exports = mongoose.connect(mongoUri,{
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},(err)=>{
    err ? console.log('failed to connect mongodb!') : console.log('success to connect mongodb!')
})