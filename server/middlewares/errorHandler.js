module.exports = (err, req, res, next) => {
  let errStatus
  let messages = []

  if (err.name === 'ValidationError') {
    errStatus = 400
    for (let key in err.errors) {
      messages.push(err.errors[key].message)
    }
  } else if (err.name === 'MongoError') {
    errStatus = 400
    if (err.errmsg.includes('duplicate key error')) {
      messages.push('Email address has already been used')
    }
  } else if (err.name === 'JsonWebTokenError') {
    errStatus = 401
    messages.push('Unauthorized access! Please sign in first.')
  } else {
    errStatus = err.status
    messages.push(err.message)
  }

  console.log("ini error di error handler", err)
  res.status(errStatus || 500).json({ messages })
}