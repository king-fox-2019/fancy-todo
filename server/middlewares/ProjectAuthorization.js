const Project = require('../models/Project.js');
const User = require('../models/User.js');

module.exports = (req, res, next) => {
    console.log('ProjectAuthorization');
    console.log('req.body.email => ',req.body.email);
    console.log('req.params.id => ',req.params.id);
    let userId;
  
    User.findOne({ email : req.body.email })
        .then((user) => {
            console.log('user => ',user)
            userId = user._id
            return Project.findById(req.params.id)
        })
        .then((project) => {
            console.log('project => ',project);
            console.log('userId => ',userId)
            
            if (project.members.indexOf(userId) >= 0) {
                console.log(project.members.indexOf(userId));
                console.log('ada')
                next()
            } else {
                console.log('tidak ada');
                res.status(500).json({msg: "You are not member of this project !"})
            }
        })
        .catch(next)
}