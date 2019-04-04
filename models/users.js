// pull in connection to database
const db = require('./conn');
const bcrypt = require('bcrypt');

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

        return db.one(`
        INSERT INTO users (first_name, last_name, username, email, password) 
        values ($1, $2, $3, $4, $5)
        returning id
        
        `, [userObject.firstName, userObject.lastName, userObject.username, userObject.email, userObject.password])
        .then(newUserData => {
            return newUserData.id;
        })

    }




}
