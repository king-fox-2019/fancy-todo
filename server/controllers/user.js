const UserModel = require('../models/user')
const ProjectModel = require('../models/project')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

module.exports = {
    signup(req, res, next) {
        const { name, email, password } = req.body
        UserModel.create({ name, email, password })
            .then(user => {
                let payload = { id : user._id }
                let token = generateToken(payload)
                res.status(201).json({ message : `create user successfuly` , name:user.name })
            })
            .catch(next)
    },
    signin(req, res, next) {
        const { email, password } = req.body
        UserModel.findOne({ email })
            .then(user => {
                if (user) {
                    if (comparePassword(password, user.password)) {
                        let payload = { id : user._id }
                        let token = generateToken(payload)
                        res.status(200).json({ token, name:user.name })
                    } else {
                        next({ status: 400, message: 'Email or Password Wrong!' })
                    }
                } else {
                    next({ status: 404, message: 'Email or Password Wrong!' })
                }
            })
            .catch(next)
    },
    google(req,res,next){
        const { email, name } = req.decoded
        UserModel.findOne({ email })
            .then(user=>{
                if (user) {
                    let payload = { id : user._id }
                    let token = generateToken(payload)
                    res.status(200).json({ token, name:user.name })
                } else {
                    return UserModel.create({
                        name,
                        email,
                        password : process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(user=>{
                let payload = { id : user._id }
                let token = generateToken(payload)
                res.status(201).json({ token, name:user.name })
            })
            .catch(next)
    },
    findAll(req, res, next) {
        UserModel.find()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    },
    delete(req, res, next) {
        UserModel.findOneAndDelete({
            _id : req.params.id
        })
        .then(user => {
            res.status(200).json({ user, message : 'Delete Success' })
        })
        .catch(next)
    },
    viewInvite(req,res,next){
        const { id } = req.loggedUser
        UserModel.findOne({ _id : id })
            .populate('invitesProject')
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(next)
    },
    deleteInvite(req,res,next){
        const { id } = req.loggedUser
        const { idProject } = req.body
        UserModel.findOneAndUpdate({ _id : id },
            {$pull : { invitesProject : idProject }})
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(next)
    },
    acceptInvite(req,res,next){
        const { id } = req.loggedUser
        const { idproject } = req.params
        UserModel.findOneAndUpdate({ _id : id }, {$pull : { invitesProject : idproject }})
            .then(result=>{
                return ProjectModel.findOneAndUpdate({ _id : idproject }, {$addToSet : { members : id }})
            })
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(next)
    }
}