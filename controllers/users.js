const User = require("../models/users");
const Item = require("../models/items");
const escapeHtml = require("../utils");

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
  const theItemName = escapeHtml(req.body.name)
  const aUser = await User.getByID(req.params.userID);
  const itemName = theItemName;
  const itemID = await aUser.addItem(itemName);
  res.send(`your item id is ${itemID}`);
}
async function buyItem(req, res) {
  const aUser = await User.getByID(req.params.userID);
  const anItem = await aUser.checkItem(req.body.itemID);
  if (anItem.message) {
    res.send("This item does not exist, punk.");
  } else {
    const purchaseID = await aUser.buyItem(anItem.id);
    console.log(anItem);
    const deleteResults = await anItem.deleteItem(anItem.id);
    console.log(deleteResults);
    res.send(`Your purchase id is ${purchaseID}`);
  }
}

async function getOwnedByUserID(req, res) {
  const aUser = await User.getByID(req.params.userID);
  const allOwnedItems = await aUser.getOwnedByUserID(aUser.id);
  res.json(allOwnedItems);
}

module.exports = {
  createUser,
  getUser,
  addItem,
  buyItem
};
