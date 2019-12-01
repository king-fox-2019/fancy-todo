const router = require("express").Router();
const ProjectController = require("../controllers/projectController");
const {
  authentication,
  authorizationAdmin,
  authorizationCrudProject
} = require("../middlewares/auth");

router.use(authentication);
//admin
router.post("/", ProjectController.createProject);
router.delete(
  "/:idProject",
  authorizationAdmin,
  ProjectController.removeProject
);
router.patch(
  "/admin/:edit/:idProject",
  authorizationAdmin,
  ProjectController.editMember
); //add member / kick member

//member
router.patch("/member/:edit/:idProject", ProjectController.accOrDec); //acc or decline

//crud in project
router.get("/", ProjectController.getAllProject);
router.get(
  "/search/:idProject",
  authorizationCrudProject,
  ProjectController.seeProject
);
router.post(
  "/addTodo/:idProject",
  authorizationCrudProject,
  ProjectController.addTodo
);

module.exports = router;
