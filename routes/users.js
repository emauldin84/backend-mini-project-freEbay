const express = require("express");
const userRouter = express.Router();

const { createUser, getUser, addItem } = require("../controllers/users");

userRouter.post("/createUser", createUser);
userRouter.get("/:userID", getUser);
userRouter.post("/:userID/addItem", addItem);

module.exports = userRouter;
