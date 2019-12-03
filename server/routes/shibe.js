const router = require('express').Router()
const ShibeController = require('../controllers/ShibeController')

router.get('/', ShibeController.getOne)

module.exports = router