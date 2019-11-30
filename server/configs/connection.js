const  mongoose  =  require("mongoose");

module.exports  = () => { 
        mongoose.connect(
            `mongodb://localhost:27017/fancyTodo`,
            {
                useNewUrlParser:  true,
                useUnifiedTopology:  true,
                useCreateIndex:  true,
                useFindAndModify:  true
            },
            err  => {
                if (err) console.log("Failed To Connect Database"); 
                else  console.log(`Connected To Database`);
            }
         );
      };