const express = require("express");
const router = express.Router();
const todoRouter = require("./todoRouter");
const userRouter = require("./userRouter");

router.use('/todo', todoRouter);
router.use('/user', userRouter);


module.exports = router;