const express = require('express');

const dashboardRouter = express.Router();
const {
    showDashboard,
    addItemToDashboard,
    claimItem,
    backToMarketplace,
    tradeToUser

} = require('../controllers/dashboard');

// dashboardRouter.get('/', showAllItems);

// URL is: localhost:3001/dashboard
dashboardRouter.get('/', showDashboard);

// look for a post request from the "add item" form

dashboardRouter.post('/sell', addItemToDashboard);

// look for a post request from the "claim item" form
dashboardRouter.post('/claim', claimItem);

// look for post request from the "resell back to marketplace" form

dashboardRouter.post('/resell', backToMarketplace);

// look for post request to trade item to another user

dashboardRouter.post('/trade', tradeToUser);


module.exports = dashboardRouter;