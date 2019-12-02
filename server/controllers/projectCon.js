const Project = require('../models/project')
const User = require('../models/user')

class ProjectController {

    static create(req, res, next) {
        const { title, description } = req.body
        const admin = req.loggedUser._id
        const members = [{_id: req.loggedUser._id, status: true}]
        Project.create({ title, description, admin, members})
            .then(project => {
                res.status(200).json(project)
            }) 
            .catch(next)
    }

    static showOne(req, res, next) {
        Project.findById(req.params.projectId)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    

    static showAllUserProjects(req, res, next) {
        const userId = req.loggedUser._id
        Project.find({members: {$elemMatch: {_id: userId, status: 'true'}}})
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(next)
    }

    static inviteMember(req, res, next) {
        const { email } = req.body
        let userId = null
        const _id = req.params.projectId
        //validasi apakah email valid
        User.findOne({email})
            .then(user => {
                if (!user) throw {message: 'Email is not registered'}
                //validasi apakah email already in project atau belum
                userId = user._id
                return Project.findById(_id)
            })
            .then(project => {
                for (let i=0; i<project.members.length; i++) {
                    if (project.members[i]._id == userId) throw ({message: 'email already members of project'})
                }
                return Project.findByIdAndUpdate({_id}, 
                                                {$push: {members: {_id: userId, status: false}}},
                                                {new: true})
            })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static showInvitation(req, res, next) {
        const userId = req.loggedUser._id
        console.log(userId)
        Project.find({members: {$elemMatch: {_id: userId, status: 'false'}}})
            .populate('admin')
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(next)     
    }

    static approveInvitation(req, res, next) {
        const userId = req.loggedUser._id
        const _id = req.params.projectId
        Project.findOneAndUpdate({_id, 'members._id': userId}, 
                                {'members.$.status': true}, 
                                {new: true})
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static declineInvitation(req, res, next) {
        const userId = req.loggedUser._id
        const _id = req.params.projectId
        Project.findOneAndUpdate({_id, 'members._id': userId}, 
                                {$pull: {members: {_id: userId, status: false}}},
                                {new: true})
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const _id = req.params.projectId
        const obj = req.body
        Project.findByIdAndUpdate({_id}, obj, {new: true})
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }


    static left(req, res, next) {
        const _id = req.params.projectId
        const userId = req.loggedUser._id
        Project.findOneAndUpdate({_id}, {$pull: {members: {_id: userId}}}, {new: true})
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        const _id = req.params.projectId
        Project.findByIdAndDelete({_id})
            .then(() => {
                res.status(200).json({message: 'delete success'})
            })
    }
}

module.exports = ProjectController