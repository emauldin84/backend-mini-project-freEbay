const express = require('express');

const dashboardRouter = express.Router();
const {
    showDashboard,
    addItemToDashboard

} = require('../controllers/dashboard');

// dashboardRouter.get('/', showAllItems);

// URL is: localhost:3001/dashboard
dashboardRouter.get('/', showDashboard)

// look for a post request (which is coming from the form)

dashboardRouter.post('/sell', addItemToDashboard)


module.exports = dashboardRouter;