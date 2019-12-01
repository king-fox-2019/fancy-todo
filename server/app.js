if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const errHandling = require('./middlewares/errHandling');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true, 
        useFindAndModify: false
    })
    .then(_ => console.log(`Connected to databse ${mongoURI}`))
    .catch(_=> console.log(`databse connection failed`));

app.use(morgan('dev'));
app.get('/', (req, res)=> {
    res.status(200).json({ msg: 'connected' })
})

const userRoute = require('./routes/user');
const todoRoute = require('./routes/todo');

app.use('/user', userRoute);
app.use('/todo', todoRoute);

app.use(errHandling);
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))