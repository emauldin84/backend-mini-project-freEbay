const express = require("express");
const loginRouter = express.Router();

const {
    showLogin,
    checkLogin,
    createNewUser
} = require('../controllers/login');


loginRouter.get('/', showLogin);
loginRouter.post('/', checkLogin);
loginRouter.post('/newuser', createNewUser);



module.exports = loginRouter;