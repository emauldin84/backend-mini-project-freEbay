const express = require('express');

const dashboardRouter = express.Router();
const {
    showAllItems,
    showDashboard

} = require('../controllers/dashboard');

// dashboardRouter.get('/', showAllItems);

// URL is: localhost:3001/dashboard
dashboardRouter.get('/', showDashboard)




module.exports = dashboardRouter;