const express = require('express')
const router = express.Router()


router.get('/', function(request, response, next) {
  response.json({ data: 'all todos' })
})

router.post('/', function(request, response, next) {
  const { title, description } = request.body

  response.status(201).json({ message: 'success create todo' })
})

router.delete('/:todoId', function(request, response, next) {
  const { todoId } = request.params

  response.status(200).json({ message: `will delete todo with id ${todoId}` })
})

router.put('/:todoId', function(request, response, next) {
  const { todoId } = request.params

  response.status(200).json({ message: `will update todo with id ${todoId}` })
})

router.patch('/:todoId', function(request, response, next) {
  const { todoId } = request.params

  response.status(200).json({ message: `will update todo with id ${todoId}` })
})



module.exports = router
