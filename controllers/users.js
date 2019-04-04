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
async function addItem(req, res) {
  const aUser = await User.getByID(req.params.userID);
  const itemName = req.body.name;
  const itemID = await aUser.addItem(itemName);
  res.send(`your item id is ${itemID}`);
}

module.exports = {
  createUser,
  getUser,
  addItem
};
