function errorHandler(err,req,res,next){
    res.status(400).json ({error:err.name,message:err.message})
};
module.exports = errorHandler