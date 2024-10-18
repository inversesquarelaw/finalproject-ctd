const Item = require("../models/Item");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllItems = async (req, res) => {
  const items = await Items.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ items, count: items.length });

  //res.send("GET all items");
};

const getItem = async (req, res) => {
  // destructure the request into userId and itemId
  const {
    user: { userId },
    params: { id: itemId },
  } = req;

  // use findOne function to find the item by its id and the user who created it
  const item = await Item.findOne({
    _id: itemId,
    createdBy: userId,
  });

  // if item doesn't exist, throw an error
  if (!item) {
    throw new NotFoundError(`No item with ${itemId} found.`);
  }

  // return the found item
  res.status(StatusCodes.OK).json({ item });

  //res.send("get a single item");
};

const createItem = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const item = await Item.create(req.body);
  res.status(StatusCodes.CREATED).json({ item });

  //res.send("create item");
};

const updateItem = async (req, res) => {
  const {
    body: { itemname, description, price, quantity, status },
    user: { userId },
    params: { id: itemId },
  } = req;

  if (itemname === "") {
    throw new BadRequestError("itemname field(s) can NOT be empty.");
  }

  const item = await Item.findByIdAndUpdate(
    { _id: itemId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!item) {
    throw new NotFoundError(`No item with ${itemId} found.`);
  }

  res.status(StatusCodes.CREATED).json({ item });

  //res.send("update item");
};

const deleteItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req;

  const item = await Item.findOneAndRemove({
    _id: itemId,
    createdBy: userId,
  });

  if (!item) {
    throw new NotFoundError(`No item with ${itemId} found.`);
  }

  // if delete is successful, we don't need to send any data back, just a 200 status code
  res.status(StatusCodes.OK).send();

  //res.send("delete item");
};

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
