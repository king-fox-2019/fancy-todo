const mongoose = require('mongoose');
const mongooseUri = process.env.MONGOOSE_URI

mongoose.connect(mongooseUri, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err)=>{
        if (err)
          {
            console.log('failed to connect\n', err)   
          }
        else
          {
            console.log('mongoose connected')
          }

} );



module.exports = mongoose