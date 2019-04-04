const User = require('../models/users');

function showLogin(req, res) {

    res.render('index', {
        locals: {
            message: ''
        }
    });
}

async function checkUsername(req, res) {



    // call the User function that checks password against password in database
    const theUser = await User.getByUsername(req.body.username);

    // if the username exists in the system
    if (theUser.username) {
        res.render('index', {
            locals: {
                message: 'Your username exists in the system'
            }
        })
    // if the username does not exist, it will have thrown an error
    } else if (theUser.message) {
        res.render('index', {
            locals: {
                message: 'Username does not exist in system'
            }
        })
    }

}

module.exports = {
    showLogin,
    checkUsername
}