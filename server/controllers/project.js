const Project = require('../models/Project')
const Todo = require('../models/Todo')


class ProjectController {
  static createProject(req, res, next) {
    console.log(`masuk create project`);
    
    let author = req.loggedUser._id
    let { title  } = req.body
    Project.create({ title, author })
      .then(project => {
        return Project.findByIdAndUpdate(project._id, { $addToSet: { members: author }}, { new: true, omitUndefined: true }) //make the author also as members
      })
      .then(project => {
        console.log(project, 'create project');
        
        res.status(201).json(project)
      })
      .catch(next)
  }

  static findAllProject(req, res, next) {
    console.log(`masuk findall project`);
    
    let author = req.loggedUser._id
    Project.find({ members : author })
      .sort({ updatedAt: -1 }) //desc
      .populate('owner', '-password')
      .then(projects => {
        // console.log(projects, `apa hasilnya findall project`);
        
        res.status(200).json(projects)
      })
      .catch(next)
  }
  static findOneProject(req, res, next) {
    console.log(`oneeeeeeeeeeeeeeeee`);
    
    console.log(req.params.id, 'dr findOneProject')
    let projectId = req.params.id
    Project.findById(projectId)
      .populate({ path: 'todos', populate: { path: 'author', select: '-password'}})
      .populate('members', '-password')
      .then(project => {
        res.status(200).json(project)
      })
      .catch(next)
  }
  
  static updateProject(req, res, next) {
    console.log(req.params.id, 'dr update project')
    let projectId = req.params.id
    const { title } = req.body
    Project.findByIdAndUpdate(projectId, { $set: { title }}, { new: true, runValidators: true, omitUndefined: true })
      .then(project => {
        res.status(200).json(project)
      })
      .catch(next)
  }

  static deleteProject(req, res, next) {
    let projectId = req.params.id
    Project.findById(projectId)
      .then(project => {
        if (!project) {
          throw { status : 404, msg : 'Project not found'}
        } else {
          return Todo.deleteMany({ _id: { $in: project.todos }})
        }
      })
      .then(() => {
        return Project.findByIdAndDelete(projectId)
      })
      .then(() => {
        res.status(200).json({ msg : 'Project deleted'})
      })
      .catch(next)

  }

  static inviteMember(req, res, next) {
    let projectId = req.params.id
    let { email } = req.body
    let member
    User.findOne({ email })
      .then(user => {
        if (!user) {
          throw {status : 400, msg : 'user not found'}
        } else {
          member = user
          return Project.findById(projectId)
        }
      })
      .then(project => {
        if (!project) {
          throw { status : 404, msg : 'project not found'}
        } else {
          if (project.members.includes(member._id)) {
            throw { status : 400, msg : 'this user is already a member'}
          } else {
            return Project.findByIdAndUpdate(projectId, { $push : { member : member._id}}, {new : true, runValidators: true, omitUndefined: true})
              .populate('todos')
              .populate('members', '-password')
          }
        }
      })
      .then(project => {
        res.status(201).json(project)
      })
      .catch(next)
  }

  static dismissMemberOrLeaveProject(req, res, next) {
    let projectId = req.params.id
    let userId = req.loggedUser._id
    Project.findById(projectId)
      .then(project => {
        if (!project) {
          throw { status : 404, msg : 'project not found'}
        } else{
          if (project.author === project.members[0]) {
            throw { status : 400, msg : 'author cannot leave the project'}
          } else {
            return Project.findByIdAndUpdate(projectId, { $pull : { member : userId}}, { new : true})
              .populate('todos')
              .populate('members', '-password')
          }
        }
      })
      .then(project => {
        res.status(200).json(project)
      })
      .catch(next)
  }

  static addProjectTodo(req, res, next) {
    let projectId = req.params.id
    let userId = req.loggedUser._id
    let  { title, description, dueDate } = req.body
    Todo.create({ title, description, dueDate, author : userId, path : projectId}) //path = di project mana
      .then(todo => {
        return Project.findByIdAndUpdate(projectId, { $push: { todos : todo._id}}, { new: true, omitUndefined: true, runValidators: true})
          .populate('todos')
          .populate('members', '-password')
      })
      .then(project => {
        res.status(201).json(project)
      })
      .catch(next)
  }

  static updateProjectTodo(req, res, next) {
    console.log(`UPDATEEEEEE`);
    console.log(req.params.id, "todo id mo updateee");
    console.log(req.body, "bawa apa aja mau updateee");
    
    let { todoId } = req.params
    let { title, description, dueDate, status } = req.body
    Todo.findByIdAndUpdate(todoId, { $set: {title, description, dueDate, status }}, { new: true, omitUndefined: true})
      .then(todo => {
        console.log(todo, 'dapet todo gakkkkk mo update plsssss');
        
        res.status(200).json({ todo })
      })
      .catch(next)
  }

  static deleteProjectTodo(req, res, next) {
    let projectId = req.params.id
    let { todoId } = req.params
    let data
    Project.findByIdAndUpdate(projectId, { $pull : { todos : todoId}}, {new : true, omitUndefined: true, runValidators: true})
      .populate('todos')
      .populate('members', '-password')
      .then(project => {
        data = project
        return Todo.findByIdAndDelete(todoId)
      })
      .then(() => {
        res.status(200).json(data)
      })
      .catch(next)
  }

}

module.exports = ProjectController