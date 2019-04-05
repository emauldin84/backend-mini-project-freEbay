const Item = require('../models/items');

async function showAllItems(req, res) {
    // needs to print all items from the database to the screen
    // need to access Item class from models

    const allItemsArray = await Item.getAllItems();

    res.json(allItemsArray);


}

function showDashboard(req, res) {

    // render the dashboard to the screen, if there is a record of the user session
    if (req.session.user) {
        // render the dashboard html view page
        res.render('dashboard');
    // if the user is not logged in already (aka no user session in record)
    } else {
        // redirect to login
        res.redirect('/login');
    }
}

module.exports = {

    showAllItems,
    showDashboard


}