function errorHandler (err, req, res, next) {

  console.log('errorHandler invoked');

  if (err.name == "JsonWebTokenError") {
      console.log('err.name => ',err.name);
      res.status(401).json({ message : "invalidToken" });
  } else if (err.name == "ValidationError") {
      console.log('err.name => ',err.name);
      console.log('err.message => ',err.message);
      let message = err.message;
      res.status(400).json({ message : message });
  } else {
      console.log('err.message => ',err.message);
      console.log('err.status => ',err.status);

      let message = err.message || "Internal Server Error"
      let status = err.status || 500

      res.status(status).json({ message : message })
  }
}

module.exports = errorHandler;
