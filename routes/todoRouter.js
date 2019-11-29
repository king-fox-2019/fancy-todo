'use strict'

const express = require('express')
const router = express.Router()
const { todoController } = require('../controllers')
const authorization = require('../middleware/authorization')

router.post('/', authorization, todoController.create)
router.get('/', authorization, todoController.read)
router.patch('/:id', authorization, todoController.update)
router.delete('/:id', authorization, todoController.delete)

module.exports = router