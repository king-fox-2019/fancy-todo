const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;
console.log(mongoUri);
module.exports = () => {
  mongoose.connect(
    mongoUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    err => {
      if (err) {
        console.log(`Failed to Connect : ${mongoUri}`);
      } else {
        console.log(`Connected to : ${mongoUri}`);
      }
    }
  );
};
