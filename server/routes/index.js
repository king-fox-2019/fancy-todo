const express = require('express')
const router = express.Router()

const userRouter = require('./user-router.js')
const todoRouter = require('./todo-router.js')

router.use(express.json())
router.use(express.urlencoded({ extended: false }))
router.use('/user', userRouter)
router.use('/todo', todoRouter)

router.get('/', function(request, response, next) {
  response.send('Server is alive!')
})

module.exports = router
