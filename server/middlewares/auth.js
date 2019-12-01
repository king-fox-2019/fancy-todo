const {verifyAccessToken} = require('../helpers/jwt')
const Todo = require('../models/Todo')

function authentication(req, res, next) {
   // check if the client sends access_token from header
   if(!req.headers.access_token) throw {errorCode: 400, message: 'Need to be authenticated'}

   try {
      verifyAccessToken(req.headers.access_token, (error, decoded) => {
         if(error) {
            if(error.name == 'TokenExpiredError' || error.name == 'JsonWebTokenError') {
               throw {
                  errorCode: 400,
                  message: 'You are not logged in'
               }
            }
            else throw(error)
         }
         else {
            req.decoded = decoded
            next()
         }
      })
   }
   catch (error) {
      next(error)
   }
}

function authorization(req, res, next) {
   
   Todo.findById(req.params.id)
   .then(todo => {
      console.log(todo.user == req.decoded.userId)
      if(todo.user == req.decoded.userId) next()
      else {
         throw {
            errorCode: 401,
            message: "You don't have authority to access this"
         }
      }
   })
   .catch(next)
}

module.exports = {authentication, authorization}
