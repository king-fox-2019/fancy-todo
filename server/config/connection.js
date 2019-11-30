const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    `mongodb://localhost:27017/${process.env.DB_NAME}-${process.env.NODE_ENV}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    err => {
      if (err) {
        console.log(
          `Failed to Connect : ${process.env.DB_NAME}-${process.env.NODE_ENV}`
        );
      } else {
        console.log(
          `Connected to : ${process.env.DB_NAME}-${process.env.NODE_ENV}`
        );
      }
    }
  );
};
