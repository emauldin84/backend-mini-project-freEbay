const db = require('./conn');

class Owned {
    constructor(id, user_id, item_id) {
        this.id = id;
        this.user_id = user_id;
        this.item_id = item_id;
    }

    static getOwnedByUserID(userID) {
        return db.any(`
        select * from owned_items
        where user_id=${userID}
        `)
        .then(ownedItemsData => {
            const arrayOfOwnedItems = [];
    
            ownedItemsData.forEach(item => {
            const ownedItemInstance = new Item (item.id, item.user_id, item.item_id);
            arrayOfOwnedItems.push(ownedItemInstance);
            });
            console.log(arrayOfOwnedItems)
            return arrayOfOwnedItems;
        })
    }
}


module.exports = Owned;