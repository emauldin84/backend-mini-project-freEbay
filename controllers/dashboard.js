const Item = require('../models/items');
const User = require('../models/users');
const Owned = require('../models/owned');

async function getAllClaimed() {

    const ownedInstances = await Owned.getAllOwned();
    
    // console.log(ownedIds);
    
    // const ownedItemsPromises = ownedIds.map(id => Item.getByID(id));
    
    // console.log(ownedItemsPromises);

    return ownedInstances;



}   
// coming from a get request
async function showDashboard(req, res) {
        
        // render the dashboard to the screen, if there is a record of the user session
    if (req.session.user) {
        
        const allItemsArray = await Item.getAllItems();

        const liArray = [];

        allItemsArray.forEach(item => {
            liArray.push(`
            <div class="mt-2 mb-2 d-flex justify-content-between border border-right-0 border-primary">
            <li>${item.name}</li>
            <form action="/dashboard/claim" method="POST">
            <div class="form-group mb-0">
            <input type="hidden" name="claimitem" value="${item.name}">
            
            </div>
            
            <button type="submit" class="btn-sm btn-primary">Claim Item</button>
        </form>
            </div>
            
            `)
        })




        const allOwnedItems = await getAllClaimed();

        // const allOwnedItemsNames = allOwnedItems.map(item => item.name);

        const ownedItemsLiArray = [];

        allOwnedItems.forEach(item => {

            console.log(req.session.user);

            if (item.user_id === req.session.user.id) {

                const dashedItem = item.item_name.replace(' ', '-');


                ownedItemsLiArray.push(`

                <div class="d-flex mt-2 mb-2 justify-content-between border border-left-0 border-primary"
            
                <li>${item.item_name}</li>
                <button type="submit" data-sell-btn class="btn-sm btn-primary ${dashedItem} ">Sell</button>

                </div>
                
                
                `);
            }
        });



    
        res.render('dashboard', {
            locals: {
                // array: `${allItemsArray.map(item => `<li>${item.name}</li>`).join('')}`
                user: req.session.user.firstName,
                array: liArray.join(''),
                claimed: ownedItemsLiArray.join('')
                    
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

    console.log(req.session);

    const userID = req.session.user.id;

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
        const ownedID = await User.buyItem(userID, itemInstance.id, itemInstance.name);

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