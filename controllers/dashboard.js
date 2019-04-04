const Item = require('../models/items');

async function showAllItems(req, res) {
    // needs to print all items from the database to the screen
    // need to access Item class from models

    const allItemsArray = await Item.getAllItems();

    res.json(allItemsArray);


}

module.exports = {

    showAllItems


}