const router = require('express').Router()
const TodoController = require('../controllers/todo')
const Authenticate = require('../middlewares/authenticate')
const Authorization = require('../middlewares/authorizationTodo')

// create todo
router.post('/', Authenticate, TodoController.createTodo);

// get all todo
router.get('/', Authenticate, TodoController.getAllTodo);

// get user todo
router.get('/mytodo', Authenticate, TodoController.getUserTodo);

// get one todo
router.get('/:id', Authenticate, TodoController.getOneTodo);

// edit status todo
router.put('/:id', Authenticate, Authorization, TodoController.editTodoStatus);

// edit content todo
router.put('/edit/:id', Authenticate, Authorization, TodoController.editContentTodo)

// delete todo
router.delete('/:id', Authenticate, Authorization, TodoController.deleteTodo);


module.exports = router