function errorHandler(err, req, res, next) {
    if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "testing" ) {
        console.log(err)
    }
    switch (err.name){
        case "MongoError": {
            res.status(400).json({ message: "database error"})
            break
        }
        default: {
            let status = err.status || 500
            let message = err.message || "internal error"
            res.status(status).json({ message})
        }
    }
}

module.exports = errorHandler