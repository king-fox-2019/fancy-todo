const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err){
    if(err) console.log(err)
    else console.log('Success to connect mongoose')
})

module.exports = mongoose