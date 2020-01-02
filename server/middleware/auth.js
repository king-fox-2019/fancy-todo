const {verify} = require('../helpers/token')
const Todo = require('../models/Todo')
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
    let currentId
    let TodoId = req.params.id
    let user = req.params.user
    Todo.findOne({_id:TodoId})
        .then( todo => {
            if(todo){
                user = todo.user
            }
        }).catch(next)
        .finally(() => {
            if(user){
                currentId = user
            }
            let userId = req.id
            if(currentId == userId){
                next()
            }else{
                next({ code: 401, msg: 'You are not authorized' })
            }
        })
}

module.exports = { authenticate , authorize }