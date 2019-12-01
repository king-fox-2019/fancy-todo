const router = require("express").Router();
const TodoController = require("../controllers/todoController");
const { authentication, authorizationTodo } = require("../middlewares/auth");

router.use(authentication);
router.post("/", TodoController.create);
router.get("/", TodoController.read);
//need authorization
router.delete("/:id", authorizationTodo, TodoController.remove);
router.patch("/:id", authorizationTodo, TodoController.update);
router.put("/:id", authorizationTodo, TodoController.updateAll);
router.get("/search/:id", authorizationTodo, TodoController.readOne);

module.exports = router;
