const Project = require('../models/project')
const User = require('../models/user')
const Todo = require('../models/todo')
const { hashPassword } = require('../helpers/password')

class ProjectController {

    static findOne(req,res,next){
        Project.findById({
            _id : req.params.id
        })
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
    }

    static projectDetails(req,res,next){

        Project.findById({
            _id : req.params.id
        })
        .populate('members')
        .then(project => {
            // console.log(project)
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({messasge : 'project not found'})
        })
        
    }

   
    static create(req,res,next){
        console.log(req.body.member)
        console.log('from createeeeeeeee')
        const membersToAdd = req.body.member;
        let userIdsGetter = [];

        for (let email of membersToAdd) {
            userIdsGetter.push(
                new Promise((resolve, reject) => {
                    User
                        .findOne({ email })
                        .then(function(user) {
                            if (!user) {
                                res.status(404).json({message:`user ${email} is not registered!`})
                                // console.log(email,'==================', membersToAdd)
                                // const name = email.split("@")[0];
                                // User
                                //     .create({ name, email, password: hashPassword(process.env.DEFAULT_PASSWORD), profilePicture : `https://ui-avatars.com/api/?name=${name}` })
                                //     .then(function(newUser) {
                                //         resolve(newUser._id);
                                //     })
                                //     .catch(reject);
                            } else {
                                resolve(user._id);
                            }
                            
                        })
                        .catch(reject);
                })
            );
        }
        Promise
            .all(userIdsGetter)
            .then(function(userIds) {
                
                userIds.push(req.loggedUser.id)
                return Project.create({
                    title : req.body.title,
                    description : req.body.description,
                    owner : req.loggedUser.id,
                    members : userIds
                })
            })
            .then(project => {
               res.status(201).json(project)
            })
            .catch(err => {
        
                res.status(400).json({message : 'all field must be filled with correct format'})
                
                next()
            })
    }

    static showAll(req,res,next){
        Project.find({
            members : req.loggedUser.id
        })
        .populate({
            path: "members",
            select : ["name", "profilePicture"]
        })
        .populate('owner','email')
        .populate({
            path: "todos",
            populate: {
                path: "assignee",
                select : ["name", "profilePicture"]
            }
        })
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
    }

    static addMembers(req,res,next){
        User.findOne({
            email : req.body.member
        })
        .then(user => {
            if(user){
                return Project.findOneAndUpdate({ _id : req.params.id},
                    { $addToSet: { members: user._id }},{new: true})
            }else{
                res.status(404).json({message : 'user not found!'})
            }
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            next()
        })
    }

    // static addMembers(req,res,next){
        
    //     const membersToAdd = req.body.member;
    //     let userIdsGetter = [];

    //     for (let email of membersToAdd) {
    //         userIdsGetter.push(
    //             new Promise((resolve, reject) => {
    //                 User
    //                     .findOne({ email })
    //                     .then(function(user) {
    //                         if (!user) {
    //                             console.log(email,'==================', membersToAdd)
    //                             const name = email.split("@")[0];
    //                             User
    //                                 .create({ name, email, password: hashPassword(process.env.DEFAULT_PASSWORD) })
    //                                 .then(function(newUser) {
    //                                     resolve(newUser._id);
    //                                 })
    //                                 .catch(reject);
    //                         } else {
    //                             resolve(user._id);
    //                         }
                            
    //                     })
    //                     .catch(reject);
    //             })
    //         );
    //     }
    //     Promise
    //         .all(userIdsGetter)
    //         .then(function(userIds) {
    //             console.log(userIds)
                
    //             return Project.findOneAndUpdate({ _id : req.params.id},
    //                 { $addToSet: {members: { $each: userIds }}},{new: true})
    //         })
    //         .then(project => {
    //            res.status(201).json(project)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             next()
    //         })
    // }

    static removeMembers(req,res,next){
        let owner
        let user
        Project.findById(req.params.id)
        .then(nowProject => {
            owner = nowProject.owner
            return User.findOne({
                email : req.body.member
            })
        })
        .then(userFound => {
            user = userFound._id
            if(user == owner){
                res.status(403).json({message : 'owner cannot leave the group'})
            }else{
                return Project.findOneAndUpdate({ _id : req.params.id},
                    { $pull: { members:{  $in: user } }},{new: true})
            }
        })
        .then((project) => {
            return Todo.deleteMany({
                assignee : user
            })
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            next()
        })
    }

    static deleteProject(req,res,next){
        Project.findOne({
            _id : req.params.id
        })
        .then( project => {
            console.log(project.owner,req.loggedUser.id);
            
            if(project.owner._id == req.loggedUser.id){
                return Project.findOneAndDelete({
                    _id : req.params.id
                })
            }else{
                res.status(403).json({message : 'only owner can perform this action'})
            }
        })
        .then(project => {
            return Todo.deleteMany({
                    projectId : project._id
                })
        })
        .then(() => {
            res.status(201).json({message : 'project successfully deleted'})
        })
        .catch(next)
    }

    static updateProjectDetail(req,res,next){
        Project.findOneAndUpdate({ _id : req.params.id },{
            title : req.body.title,
            description : req.body.description,
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
    }

    static addTodo(req,res,next){
        let email
        
        User.findOne({
            email : req.body.assignee
        })
        .then(user => {
            
            return Todo.create({
                    title : req.body.title,
                    description : req.body.description,
                    date : req.body.date,
                    userId : req.loggedUser.id,
                    projectId : req.params.id,
                    assignee : user._id
                })
        })
        .then(todo => {
            return Project.findOneAndUpdate(
                { _id : req.params.id },{ $push: { todos : todo } },{ new:true })
        })
        .then(project => {
            res.status(201).json({message : "project successfully updated"})
        })
        .catch(err => {
            next()
        })
    }

    static showTodo(req,res,next){
        Todo.find({
            projectId : req.params.id
        })
        .populate({
            path: "assignee",
            select : ["name", "profilePicture"]
        })
        
        
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err =>{
            console.log(err)
            next()
        })
    }

    static deleteTodo(req,res,next){
        Todo.findOneAndDelete({
            _id : req.params.todoid
        })
        .then(todo => {
            return Project.findOneAndUpdate({ _id : req.params.id},
                { $pull: { todos:{  $in: todo._id } }},{new: true})
                .catch(err => {
                    console.log(err)
                })
        })
        .then(project => {
           res.status(201).json({message : "delete todo success, project successfully updated"})
        })
        .catch(err => {
            console.log(err)
            next()
        })
    }

    static findOne(req,res,next){
        Todo.findOne({
            _id : req.params.todoid
        })
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(next)
    }

    static updateTodo(req,res,next){
        
        Todo.findOneAndUpdate({_id : req.params.todoid},{
                title : req.body.title,
                description : req.body.description,
                date : req.body.date,
                userId : req.loggedUser.id,
                assignee: req.body.assignee
            },{new : true})
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(next)
    }

    static updateTodoStatus(req,res,next){
        Todo.findOneAndUpdate({_id : req.params.todoid},{
                status : req.body.status
            },{ new : true })
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            console.log(err)
            next()
        })
    }

    static updateTodoStarred(req,res,next){
        let starredStatus
        Todo.findOne({
            _id : req.params.todoid
        })
        .then(todo => {
            if(todo.starred === true){
                starredStatus = false
            }else{
                starredStatus = true
            }
            return Todo.findOneAndUpdate({_id : req.params.todoid},{
                starred : starredStatus
            },{ new : true })
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(next)
    }

    static leaveGroup(req,res,next){
        // console.log('from ;eave group')
        Project.findOne({
            _id : req.params.id
        })
        .then(project => {
            if(project.owner._id == req.loggedUser.id){
                res.status(403).json({message : `The owner is not allowed to leave the group`})
            }else{
                return Project.findOneAndUpdate(
                    { _id : req.params.id},
                    { $pull: { members:{  $in: req.loggedUser.id } }},
                    {new: true})
            }
        })
        .then((project) => {
            return Todo.deleteMany({
                assignee : req.loggedUser.id
            })
        })
        .then((todo)=>{
            res.status(201).json({message : `Todo in project successfully updated`})
        })
        .catch(err => {
            res.status(403).json({message : `you're not allowed to leave the group`})
        })
    }
       
}

module.exports = ProjectController