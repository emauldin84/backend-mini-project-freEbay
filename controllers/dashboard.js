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

    
        const newArray = `${allItemsArray.map(item => `<li>${item.name}</li>`).join('')}`;

        console.log(newArray);
    
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

module.exports = {

    showDashboard,
    addItemToDashboard


}