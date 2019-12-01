function errorHandler(err, req, res, next){
  let errorList = {}
  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(500).json({
      message: `Email must be unique`
    });
  }
  else if (err.message == 'Unhandled path'){
    res.status(404).json({
      message: `Not found`
    })
  }
  else if (err.message != undefined){
    if (err.message){
      errorList['message'] = err.message
    }
    else {
      for (let key in err.errors){
        errorList[key] = err.errors[key].message
      }
    }
    res.status(400).json(errorList)
  }
  else {
    res.status(500).json({
      message: `Something wrong with the server`
    })
  }
}

module.exports = errorHandler