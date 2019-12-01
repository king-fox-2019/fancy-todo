const {verify} = require('../helpers/token')
function authenticate(req,res,next){
    let token = req.headers.token
    if (token) {
        try {
            let payload = verify(token)
            req.id = payload.id
            next()
        } catch (err) {
            throw({ err })
        }
    } else {
        throw { code: 400, msg: 'you are not authenticated user' }
    }
}

function authorize(req, res, next){
    let currentId = req.params.user
    let userId = req.id
    if(currentId == userId){
        next()
    }else{
        throw { code: 401, msg: 'You are not able to see the todo list of this user' }
    }
}

module.exports = { authenticate , authorize }