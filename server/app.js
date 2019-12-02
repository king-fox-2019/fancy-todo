if(process.env.NODE_ENV) {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const cors = require('cors');
// const morgan = require('morgan')
const routes = require('./routes/index.js');
const errorHandler = require('./middlewares/ErrorHandler.js');

mongoose.connect(process.env.MONGODB_URI_LOCAL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
	.then(() => console.log('mongoose connected'))
	.catch(() => console.log('cant connect to database'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(morgan('combined'));
app.use('/', routes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
})

