module.exports = {
  errorHandler: function (err, req, res, next) {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'

    if(err.name === 'ValidationError') {
      const errors = []
      for(key in err.errors) {
        errors.push(err.errors[key].message)
      }
      res.status(400).json({
        message: 'Validation error',
        errors
      })
    } else if(err.message.name === 'JsonWebTokenError') {
      res.status(status).json({ message: err.message.message })
    } else {
      res.status(status).json({ message })
    }
  }
}

