const ProjectModel = require('../models/project')
const UserModel = require('../models/user')
const TodoModel = require('../models/todo')
const nodemailer = require('../helpers/nodemailer')

module.exports = {
    updateTodosProject(req,res,next){
        const { title, description, due_date } = req.body
        const { id } = req.params
        TodoModel.findOneAndUpdate({ _id : id },{ title, description, due_date},{ new : true, runValidators: true })
            .then(todo=>{
                res.status(200).json({
                    todo, message : 'updated successfuly!'
                })
            })
            .catch(next)
    },
    updateName(req,res,next){
        const UserId = req.loggedUser.id
        const { id } = req.params
        const { name } = req.body
        ProjectModel.updateOne({ _id : id },{ name },{new:true, runValidators:true})
            .then(project=>{
                res.status(200).json({
                    project, message : 'updated successfuly!'
                })
            })
            .catch(next)
    },
    findAllTodoProject(req,res,next){
        let projectTemp;
        const { id } = req.params
        ProjectModel.findOne({ _id : id })
            .then(project=>{
                projectTemp = project
                return TodoModel.find({ projectId : id })
                                .populate('projectId')
                                .populate('UserId')
            })
            .then(todos=>{
                res.status(200).json({
                    project : projectTemp,
                    todos
                })
            })
            .catch(next)
    },
    findAll(req,res,next){
        const owner = req.loggedUser.id
        ProjectModel.find({ owner }).sort([['createdAt',-1]])
            .then(projects=>{
                res.status(200).json(projects)
            })
            .catch(next)
    },
    findInMember(req,res,next){
        const { id } = req.loggedUser
        ProjectModel.find({ members : id }).sort([['createdAt',-1]])
            .then(projects=>{
                res.status(200).json(projects)
            })
            .catch(next)
    },
    create(req,res,next){
        const owner = req.loggedUser.id
        const { name } = req.body
        ProjectModel.create({ name, owner })
            .then(todo=>{
                res.status(201).json({
                    project : todo, message : 'create project successfuly!'
                })
            })
            .catch(next)
    },
    invite(req,res,next){
        const { email } = req.body
        const { id } = req.params
        let emailUser
        UserModel.findOne({ email })
            .then(user=>{
                if(!user){
                    throw {
                        status : 404,
                        message : 'user tidak ditemukan'
                    }
                } else {
                    emailUser = user.email
                    return UserModel.findOneAndUpdate(
                        { _id : user._id },
                        { $addToSet : { invitesProject : id }}, { new : true })
                }
            })
            .then(result=> {
                nodemailer(emailUser,`Invitation Project at ${new Date()}`)
                res.status(200).json({
                    result, message : 'invite member successfuly!'
                })
            })
            .catch(next)
    },
    viewInvite(req,res,next){
        UserModel.find()
            .then(users=>{
                let userProject = []
                users.forEach(user=>{
                    user.invitesProject.forEach(projectId=>{
                        if (projectId == req.params.id) {
                            userProject.push(projectId)
                        }
                    })
                })
                res.status(200).json(userProject)
            })
            .catch(next)
    },
    deleteInvite(req,res,next){
        const idProject = req.params.id
        const { id } = req.loggedUser
        UserModel.findOneAndUpdate(
            { _id : id },
            { $pull : { invitesProject : idProject }}, { new : true })
            .then(result=>{
                res.status(200).json({
                    message : 'success delete invitation'
                })
            })
            .catch(next)
    },
    deleted(req,res,next){
        const { id } = req.params
        ProjectModel.findOneAndDelete(
            { _id : id })
            .then(project=>{
                res.status(200).json({
                    project, message : 'delete project successfuly!'
                })
            })
            .catch(next)
    }
}