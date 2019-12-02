const Project = require('../models/project')

function authorization(req,res,next){
    Project.findOne({
        _id: req.params.id
    })
    .then(project => {
        if(project.creator == req.decoded.id || project.members.includes(req.decoded.id)){
            next()
        }else{
            next({
                status: 403,
                message: 'You dont have authorize to do action' 
            })
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization