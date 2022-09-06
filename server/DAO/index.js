require("dotenv").config();
const DaoMongoProductsContainer = require("./products/daoMongo");
const DaoMongoCartContainer = require("./carts/daoMongo");
const DaoMongoUsersContainer = require("./users/daoMongo");

const getStorage = () => {
  const storage = process.env.STORAGE;

  switch (storage) {
    case "mongo":
      return {
        products: new DaoMongoProductsContainer(),
        cart: new DaoMongoCartContainer(),
        users: new DaoMongoUsersContainer(),
      };
  }
};

module.exports = getStorage;
