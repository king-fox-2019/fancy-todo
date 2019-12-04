const router = require("express").Router();
const UserController = require("../controllers/userController");
const verify = require("../middlewares/googleVerify");

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.post("/googlesignin", verify, UserController.googleSignin);
module.exports = router;
