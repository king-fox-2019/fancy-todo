const router = require('express').Router()
const { UserController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const googleVerify  = require('../middlewares/googleVerify')

router.get('/', UserController.findAll)
router.get('/finduserbyname', UserController.findOneByName)
router.get('/getuser', authentication, UserController.getUserId)

router.post('/register', UserController.register)
router.post('/login',UserController.login)
router.post('/signin/google', googleVerify, UserController.googleSignIn)



router.patch('/updateuser/:userId', UserController.patchUser)
router.put('/updateuser/:userId', UserController.putUser)
router.delete('/delete/:userId', UserController.deleteUser)




router.get('/test', UserController.test)
module.exports = router