const { verify } = require('../helpers/JWT')

class Auth{
  static authenticate(req, res, next){
    try{
      verify(req.headers.access_token)
      next()
    }
    catch(err){
      throw new Error(`Access token is not valid`)
    }
  }
  static authorize(req, res, next){
    try{
      req.userId = verify(req.headers.access_token)
      next()
    }
    catch(err){
      throw new Error(`Access token is not valid`)
    }
  }
}

module.exports = Auth