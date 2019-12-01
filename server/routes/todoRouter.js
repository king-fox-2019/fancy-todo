'use strict'

const express = require('express')
const router = express.Router()
const { todoController } = require('../controllers')
const authorization = require('../middleware/authorization')

router.post('/', todoController.create)
router.get('/', todoController.read)
router.put('/:id', authorization, todoController.update)
router.delete('/:id', authorization, todoController.delete)

module.exports = router