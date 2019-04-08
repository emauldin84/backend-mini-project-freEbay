const User = require('../models/users');

function showLogin(req, res) {

    // need to clear session here
    req.session.destroy(() => {
        res.render('index', {
            locals: {
                message: ''
            }
        });

    })

}

async function checkLogin(req, res) {

    // call the User function that checks username against username in database
    // if the username exists, creates an instance of User
    const theUser = await User.getByUsername(req.body.username);

    // get the password from the form (it is .password because that is the name we gave it in HTML)
    const enteredPassword = req.body.password;

    // use the checkPassword instance method to check if it matches saved password in database


    // username and password match what is in the system

    console.log(`This is the username: ${theUser.username}`);

    if (theUser.username && await theUser.checkPassword(enteredPassword)) {
    
        // then load the dashboard and save the user info in a session

        // session is how we will track whether or not user can see the dashboard
        // store instance of user in the session
        req.session.user = theUser;

        // redirect the page to localhost:3001/dashboard
        res.redirect('/dashboard');


    
    // if the username is incorrect
    } else if (theUser.message) {

        // render login page (index) again with the message username not in system
        res.render('index', {
            locals: {
                message: 'Your username does not exist in the system'
            }
        })
    // if the password is incorrect
    } else if (theUser.checkPassword(enteredPassword) === false) {
        // render login page (index) again with the message password not correct
        res.render('index', {
            locals: {
                message: 'Password is not correct. Please try again'
            }
        })
    }

}

module.exports = {
    showLogin,
    checkLogin
}