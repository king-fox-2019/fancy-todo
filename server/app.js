if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
// declare dep
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/connection");
const morgan = require("morgan");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3000;
//connection to Mongoose DB
connection();
//set depedencies
app.use(cors());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
//middleware route
app.use("/", routes);
app.use(errorHandler);
//listen port
app.listen(PORT, err => {
  if (err) console.log(`Failed to Connect ${PORT}`);
  else console.log(`Listen to Port : ${PORT}`);
});

module.exports = app;
