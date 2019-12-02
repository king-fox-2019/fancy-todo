const router = require('express').Router()
const UserController = require('../controllers/userCon')
const { authentication } = require('../middlewares/auth')

router.post('/signup', UserController.create)
router.post('/signin', UserController.signin)
router.post('/google', UserController.googleSignIn)

router.use(authentication)
router.get('/', UserController.showOne)
router.put('/password/', UserController.updatePassword)
router.put('/', UserController.update)
router.delete('/', UserController.delete)


module.exports = router
