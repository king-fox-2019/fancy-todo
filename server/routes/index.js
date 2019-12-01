const router = require("express").Router();
const userRoute = require("./user");
const todoRoute = require("./todo");
const projectRoute = require("./project");
const quoteRoute = require("./quote");

router.use("/users", userRoute);
router.use("/todos", todoRoute);
router.use("/projects", projectRoute);
router.use("/quotes", quoteRoute);

module.exports = router;
