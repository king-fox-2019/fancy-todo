const router = require('express').Router()
const MemberController = require('../controllers/member')
const Authenticate = require('../middlewares/authenticate')
const Authorization = require('../middlewares/authorizationProject')
const AuthorizationMember = require('../middlewares/authorizationMember')

// add member
router.post('/:id', Authenticate, Authorization, AuthorizationMember, MemberController.addMember)

// kick member
router.delete('/:id', Authenticate, Authorization, MemberController.removeMember)

module.exports = router