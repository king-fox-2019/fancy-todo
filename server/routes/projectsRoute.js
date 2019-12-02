const ProjectController = require('../controllers/ProjectController.js');
const router = require('express').Router();
const authentication = require('../middlewares/Authentication.js');
const todoAuthorization = require('../middlewares/TodoAuthorization.js');
const projectAuthorization = require('../middlewares/ProjectAuthorization.js');

console.log('*** projectsRoute ***')

router.use(authentication)
router.get('/pending', ProjectController.showPendingMember)
router.post('/', ProjectController.create)
router.get('/', ProjectController.showAll)
router.get('/:id', ProjectController.showOne)
router.delete('/:id', ProjectController.delete)
router.put('/:id', ProjectController.update)
router.put('/addTodo/:id', projectAuthorization, ProjectController.addProjectsTodo)
router.put('/invite/:id', ProjectController.inviteMember)
router.put('/join/:id', ProjectController.joinProject)
router.put('/decline/:id', ProjectController.declineProject)

module.exports = router;