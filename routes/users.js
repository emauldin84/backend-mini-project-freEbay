const express = require("express");
const userRouter = express.Router();

const { 
    createUser, 
    getUser, 
    addItem, 
    buyItem } = require("../controllers/users");

userRouter.post("/createUser", createUser);
userRouter.get("/:userID", getUser);
userRouter.post("/:userID/addItem", addItem);
userRouter.post("/:userID/buy", buyItem)

module.exports = userRouter;
