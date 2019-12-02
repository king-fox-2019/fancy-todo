const router = require('express').Router();
const authentication = require('../middlewares/Authentication.js');
const todoAuthorization = require('../middlewares/TodoAuthorization.js');
const todoController = require('../controllers/TodoController.js');

console.log('*** todoRoute ***');

router.use(authentication)
router.post('/',todoController.create)
router.get('/',todoController.showAll)
router.get('/:id',todoController.showOne)
router.put('/:id', todoController.update)
router.delete('/:id', todoController.delete)

module.exports = router;
