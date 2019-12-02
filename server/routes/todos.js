const router = require('express').Router();
const TodoController = require('../controllers/todo');
const authenticate = require('../middlewares/authenticate');

router.get('/:id', authenticate, TodoController.showOne);
router.put('/:id', authenticate, TodoController.updateOne);
router.patch('/:id', authenticate, TodoController.updateStatus);
router.delete('/:id', authenticate, TodoController.deleteOne);

module.exports = router;