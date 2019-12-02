const router = require('express').Router()
const todo = require('./todoRoute')
const user = require('./userRoute')
const project = require('./projectRoute')


router.use('/todo', todo)
router.use('/user', user)
router.use('/project', project)



module.exports = router