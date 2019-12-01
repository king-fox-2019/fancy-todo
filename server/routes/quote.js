const router = require("express").Router();
const TodoController = require("../controllers/todoController");
const { authentication } = require("../middlewares/auth");

router.use(authentication);
router.get("/", TodoController.getQuote);

module.exports = router;
