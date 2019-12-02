const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_ATLAS, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(`Failed connect to database`)
    console.log(err);
  }
  else console.log(`Success connect to database`)
})

module.exports = mongoose