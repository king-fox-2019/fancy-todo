module.exports = (err, req, res, next) => {
  console.log(err.name, "=================", err);
  let message = []

  if (err.status) {
    if (err.message) {
      message.push(err.message)
    }
    res.status(err.status).json({ message })
  } else {
    if (err.name === `ValidationError`) {
      message.push(`Register failed`)
      // console.log(err.errors)
      for (let field in err.errors) {
        if (field === `email` && err.errors[field].kind === 'unique') {          
          err.errors[field].message = `email is already exist`
        }
        message.push(err.errors[field].message)
      }
      res.status(400).json({ message })
    } else if (err.name === 'JsonWebTokenError') {
      console.log(err.message);
      let msg = `jwt id invalid`
      message.push(msg)
      res.status(401).json({ message })
    }
    else {
      let msg = `internal server error`
      message.push(msg)
      res.status(500).json({ message })
    }

  }
}

