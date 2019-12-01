module.exports = (err, req, res, next) => {
    console.log(err, '****************************')
    let status, message;
    if (err.name) {
        switch (err.name) {
            case "CastError":
                status = err.status || 500;
                message = err.message || "Internal server error"
            break;
            default:
                status = 500;
                message = `${err.name} - Internal server error`
        }
    } else {
        status = err.status;
        message = err.message;
    }
    res.status(status).json({ message: message });
}