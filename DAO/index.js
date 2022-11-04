require("dotenv").config();
const DaoMongoProductsContainer = require("./products/daoMongo");
const DaoMongoCartContainer = require("./carts/daoMongo");
const DaoMongoOrderContainer = require("./orders/daoMongo");
const DaoMongoMessagesContainer = require("./messages/daoMongo");

const getStorage = () => {
  return {
    products: new DaoMongoProductsContainer(),
    cart: new DaoMongoCartContainer(),
    orders: new DaoMongoOrderContainer(),
    messages: new DaoMongoMessagesContainer(),
  };
};

module.exports = getStorage;
