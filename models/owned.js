const db = require('./conn');

class Owned {

    constructor(id, user_id, item_id, item_name) {
        this.id = id;
        this.user_id = user_id;
        this.item_id = item_id;
        this.item_name = item_name;
    }

    static getAllOwned() {
        return db.any(`
        select * from owned_items
        
        `).then(ownedItems => {

            const arrayOfInstances = ownedItems.map(ownedItem => new Owned(ownedItem.id, ownedItem.user_id, ownedItem.item_id, ownedItem.item_name));

            return arrayOfInstances;
        })

    }


}

module.exports = Owned;