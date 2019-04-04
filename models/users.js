// pull in connection to database
const db = require("./conn");
const Item = require("./items");
const bcrypt = require("bcrypt");

// User should be able to:

// 1. User should be able to create users

class User {
  constructor(id, first_name, last_name, username, email, password) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static createUser(userObject) {
    return db
      .one(
        `
        INSERT INTO users (first_name, last_name, username, email, password) 
        values ($1, $2, $3, $4, $5)
        returning id
        
        `,
        [
          userObject.first_name,
          userObject.last_name,
          userObject.username,
          userObject.email,
          userObject.password
        ]
      )
      .then(newUserData => {
        return newUserData.id;
      });
  }

  static getByID(id) {
    return db
      .one(
        `
        select * from users 
        where id=${id} 
        `
      )
      .then(userData => {
        const userInstance = new User(
          userData.id,
          userData.first_name,
          userData.last_name,
          userData.username,
          userData.email,
          userData.password
        );
        return userInstance;
      });
  }
  addItem(item) {
    return db
      .one(
        `
    INSERT INTO items (name)
    values ($1)
    returning id 
    `,
        [item]
      )
      .then(newItemData => {
        return newItemData.id;
      });
  }
  checkItem(id) {
    const theItem = Item.getByID(id);
    return theItem;
  }
  buyItem(id) {
    return db
      .one(
        `
            INSERT INTO owned_items (user_id, item_id)
            values ($1, $2)
            returning id
            `,
        [this.id, id]
      )
      .then(newOwnedData => {
        return newOwnedData.id;
      });
  }
}

module.exports = User;
