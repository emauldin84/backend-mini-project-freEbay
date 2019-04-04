const express = require("express");
const userRouter = express.Router();

const { createUser, getUser } = require("../controllers/users");

userRouter.post("/createUser", createUser);
userRouter.get("/:userID", getUser);

module.exports = userRouter;
