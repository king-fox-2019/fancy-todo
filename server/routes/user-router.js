const express = require('express')
const router = express.Router()


router.post('/register', function(request, response, next) {
  const { email, password } = request.body

  response.status(201).json({ email, password })
})

router.post('/login', function(request, response, next) {
  const { email, password } = request.body

  response.status(200).json({ email, password })
})


module.exports = router
