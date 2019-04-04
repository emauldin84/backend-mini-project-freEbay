const db = require('./conn');

class Item {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static getAllItems() {
        return db.any(`
        select * from items
        `)
        .then(itemsData => {
            const arrayOfInstances = [];

            itemsData.forEach(item => {

                const itemInstance = new Item(item.id, item.name);
                arrayOfInstances.push(itemInstance);
            })
            return arrayOfInstances;
        })

    }



}

module.exports = Item;