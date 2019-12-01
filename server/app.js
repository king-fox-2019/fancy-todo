if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
require('./config/mongoose');

const express = require('express');
const app = express();
const router = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/", router);

module.exports = app;