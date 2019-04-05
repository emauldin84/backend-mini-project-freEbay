const Item = require('../models/items');
const User = require('../models/users')

    
// coming from a get request
async function showDashboard(req, res) {
        
        // render the dashboard to the screen, if there is a record of the user session
    if (req.session.user) {
        
        const allItemsArray = await Item.getAllItems();

        const liArray = [];

        allItemsArray.forEach(item => {
            liArray.push(`<li>${item.name}</li>`)
        })

    
        // const newArray = `${allItemsArray.map(item => `<li>${item.name}</li>`).join('')}`;

        // console.log(newArray);
    
        res.render('dashboard', {
            locals: {
                // array: `${allItemsArray.map(item => `<li>${item.name}</li>`).join('')}`
                array: liArray.join('')
                    
                }
        })

    // if the user is not logged in already (aka no user session in record)
    } else {
        // redirect to login
        res.redirect('/login');
    }
}

// handle a route that is of type post

async function addItemToDashboard(req, res){

    // only an instance of User can add an item.
    // if you're on the dashboard, then there must be a record of theUser in session

    const theItem = req.body.additem;
    const newItemID = await User.addItem(theItem);
    res.redirect('/dashboard');
    

}

// needs to check if the item exists in the items table
// if it does, add item to owned items table (with the userID and itemID)
// also removes from the items list
// if it doesn't, error message "Item does not exist"
async function claimItem(req, res) {

    const userID = req.session.user;

    // needs to check if the item exists in the items table
    // get array of all the items in the items table
    const allItemsArray = await Item.getAllItems();
    const claimedItem = req.body.claimitem;
    console.log(`This is claimed item: ${claimedItem}`);
    console.log(allItemsArray);

    const itemInstance = await Item.getItemByName(claimedItem);
    
    const namesArray = [];

    allItemsArray.forEach(item => {
        namesArray.push(item.name);
    });

    // if the array of items has the claimed item inside of it
    if (namesArray.includes(claimedItem)) {

        // delete item from items table
        await itemInstance.deleteItem(itemInstance.id);

        // add item to owned items table
        const ownedID = await User.buyItem(userID, itemInstance.id);

        res.redirect('/dashboard');

    } else {
        res.send('this not working');
    }



}

module.exports = {

    showDashboard,
    addItemToDashboard,
    claimItem


}