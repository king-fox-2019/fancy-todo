if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require('./routes/router')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

mongoose.connect("mongodb://localhost:27017/todo_db", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/',router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
