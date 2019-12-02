const router = require('express').Router();
const InvitationController = require('../controllers/invitation');
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, InvitationController.showAll);
router.post('/', authenticate, InvitationController.bulkCreateInvitations);
router.patch('/:id', authenticate, InvitationController.acceptInvitation);
router.delete('/:id', authenticate, InvitationController.declineInvitation);

module.exports = router;