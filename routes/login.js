const express = require("express");
const loginRouter = express.Router();

const {
    showLogin,
    checkUsername
} = require('../controllers/login');


loginRouter.get('/', showLogin);
loginRouter.post('/', checkUsername);



module.exports = loginRouter;