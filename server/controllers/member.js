const User = require('../models/user')
const Project = require('../models/project')

class MemberController {
    static addMember(req,res,next){
        Project.findOne({
            _id: req.params.id
        })
        .then(project => {
            if(project.creator == req.user.id){
                throw({
                    status: 400,
                    message: 'You cannot add creator Project as member!'
                })
            }else if(project.members.includes(req.user._id)){
                throw({
                    status: 400,
                    message: 'User already registered as member in this project!'
                })
            }else{
                return Project.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $push : {members: req.user._id}
                })
            }
        })
        .then(project => {
            res.status(201).json({
                message: 'Success Add Member!'
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static removeMember(req,res,next){
        const {id} = req.params
        User.findOne({
            email: req.query.email
        })
        .then(user => {
            if(user){
                return Project.findByIdAndUpdate({
                    _id: id
                },
                {
                    $pull : { members : user._id}
                })
            }else{
                throw({
                    status: 400,
                    message: 'There is no user with that email'
                })
            }
        })
        .then(result => {
            res.status(200).json({
                message: 'Kick member success!'
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = MemberController