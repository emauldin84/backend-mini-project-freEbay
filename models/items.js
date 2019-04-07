const db = require("./conn");

class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static getAllItems() {
    return db
      .any(
        `
        select * from items
        `
      )
      .then(itemsData => {
        const arrayOfInstances = [];

        itemsData.forEach(item => {
          const itemInstance = new Item(item.id, item.name);
          arrayOfInstances.push(itemInstance);
        });
        return arrayOfInstances;
      });
  }

  static getAllClaimed() {
    return db.any(`
    select * from owned_items
    
    `)
    .then(ownedItemsData => {
      const ownedIds = [];
      ownedItemsData.forEach(item => {

        ownedIds.push(item.item_id);
      })

      return ownedIds;
    })


  }
  static getByID(id) {
    return db
      .one(
        `
        select * from items
        where id=${id}
        `
      )
      .then(itemData => {
        const itemInstance = new Item(itemData.id, itemData.name);
        return itemInstance;
      })
      .catch(err => {
        return err;
      });
  }

  static getItemByName(name) {
    return db.one(`
    select * from items
    where name ILIKE '${name}'
    
    `)
    .then(itemData => {
      const itemInstance = new Item(itemData.id, itemData.name);
      return itemInstance;
    })
  }

  deleteItem(id) {
    return db.result(
      ` 
        delete from items
        where id=${id}
        `
    );
  }
}

module.exports = Item;
