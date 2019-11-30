if (process.env.NODE_ENV === "development") require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middlewares");

require('./config/mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/', (req, res) => {
    res.send('/api to access API')
});

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Running on PORT ${PORT}...`))

