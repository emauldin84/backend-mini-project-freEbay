const User = require('../models/users')

async function createUser(req, res) {
    const formObject = req.body;
    // res.send('you sent a post request');
    const userID = await User.createUser(formObject);
    res.send(`Your user id is ${userID}`);
};


module.exports = {

    createUser

};