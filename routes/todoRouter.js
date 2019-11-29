'use strict'

const express = require('express')
const router = express.Router()
const { todoController } = require('../controllers')
// const authorization = require('../middleware/authorization')

router.post('/', todoController.create)
router.get('/', todoController.read)
router.put('/:id', todoController.update)
router.delete('/:id', todoController.delete)

module.exports = router