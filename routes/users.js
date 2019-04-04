const express = require('express');
const userRouter = express.Router();



const {
    createUser
} = require('../controllers/users');


userRouter.post('/createUser', createUser);



module.exports = userRouter;