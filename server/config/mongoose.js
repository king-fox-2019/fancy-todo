const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/fancy-todo", 
    { 
        useNewUrlParser: true ,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() { 
    console.log("Connected!") 
});
