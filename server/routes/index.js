const routes = require('express').Router()
const userRoutes = require('./user')
const todoRoutes = require('./todo')
const projectRoutes = require('./project')

routes.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Connected To Server'
    })
})

routes.use('/user',userRoutes)
routes.use('/todo', todoRoutes)
routes.use('/project', projectRoutes)

module.exports = routes