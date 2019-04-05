const express = require('express');

const dashboardRouter = express.Router();
const {
    showDashboard,
    addItemToDashboard,
    claimItem

} = require('../controllers/dashboard');

// dashboardRouter.get('/', showAllItems);

// URL is: localhost:3001/dashboard
dashboardRouter.get('/', showDashboard);

// look for a post request from the "add item" form

dashboardRouter.post('/sell', addItemToDashboard);

// look for a post request from the "claim item" form
dashboardRouter.post('/claim', claimItem);


module.exports = dashboardRouter;