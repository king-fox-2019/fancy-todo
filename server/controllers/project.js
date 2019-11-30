const Project = require('../models/project')

class ProjectController{
    static getAllProject(req,res,next){
        Project.find()
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOneProject(req,res,next){
        Project.findOne({
            _id: req.params.id
        })
        .populate('creator')
        .populate('members')
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            next(err)
        })
    }

    static getUserProject(req,res,next){
        Project.find()
            .populate('creator')
            .then(projects => {
                let userProjects = []
                projects.forEach(data => {
                    if(data.members.includes(req.decoded.id) || data.creator._id == req.decoded.id){
                        userProjects.push(data)
                    }
                })
                res.status(200).json(userProjects)
            })
            .catch(err => {
                next(err)
            })
    }

    static createProject(req,res,next){
        Project.create({
            title: req.body.title,
            creator: req.decoded.id
        })
        .then(project => {
            res.status(201).json({
                message: `Create project ${project.title} success!`
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static editProject(req,res,next){
        Project.findOneAndUpdate({
            _id: req.params.id
        },
        {
            title: req.body.title
        })
        .then(result => {
            res.status(200).json({
                message: 'Update project success!'
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteProject(req,res,next){
        Project.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            res.status(200).json({
                message: 'Delete project success!'
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProjectController