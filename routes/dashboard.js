const express = require('express');

const dashboardRouter = express.Router();
const {
    showAllItems

} = require('../controllers/dashboard');

dashboardRouter.get('/', showAllItems);




module.exports = dashboardRouter;