const router = require('express').Router();
const ProjectController = require('../controllers/project');
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, ProjectController.showAll);
router.get('/:id', authenticate, ProjectController.showOne);
router.post('/', authenticate, ProjectController.create);
router.put('/:id', authenticate, ProjectController.update);
router.delete('/:id', authenticate, ProjectController.destroy);
router.post('/:id/todos', authenticate, ProjectController.createTodo);
router.post('/:id/todos/calendar', authenticate, ProjectController.addToCalendar);
router.get('/:id/todos', authenticate, ProjectController.showAllTodos);

module.exports = router;