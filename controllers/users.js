const User = require("../models/users");

async function createUser(req, res) {
  const formObject = req.body;
  // res.send('you sent a post request');
  const userID = await User.createUser(formObject);
  res.send(`Your user id is ${userID}`);
}
async function getUser(req, res) {
  //console.log(req.params.userID);
  const userID = req.params.userID;
  const aUser = await User.getByID(userID);
  res.json(aUser);
}

module.exports = {
  createUser,
  getUser
};
