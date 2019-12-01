function errorHandler(err, request, response, next) {
  if (err.name === 'ValidationError') {
    const message = []
    for (let keys in err.errors) {
      message.push(err.errors[keys].message)
    }
    response.status(422).json({ errors: message })
  } else if (err.name === 'UserNotFound') {
    response.status(404).json({ error: err.message })
  } else if (err.name === 'InvalidGoogleToken') {
    response.status(422).json({ error: err.message })
  }
  else {
    response.status(500).json(err)
  }
}


module.exports = errorHandler
