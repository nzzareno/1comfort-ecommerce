const daoArchiveCart = require("./carts/daoArchive");
const daoArchiveProducts = require("./products/daoArchive");
const DaoMongoProductsContainer = require("./products/daoMongo");
const DaoMongoCartContainer = require("./carts/daoMongo");
const DaoFirebaseProducts = require("./products/daoFirebase");
const DaoFirebaseCart = require("./carts/daoFirebase");
const DaoMySqlProductsContainer = require("./products/daoMySql");
const DaoMySqlCartContainer = require("./carts/daoMySql");

const getStorage = () => {
  const storage = process.env.STORAGE;

  switch (storage) {
    case "firebase":
      return {
        products: new DaoFirebaseProducts(),
        cart: new DaoFirebaseCart(),
      };
    case "mongo":
      return {
        products: new DaoMongoProductsContainer(),
        cart: new DaoMongoCartContainer(),
      };
    case "fs":
      return {
        products: new daoArchiveProducts(),
        cart: new daoArchiveCart(),
      };
    case "mysql":
      return {
        products: new DaoMySqlProductsContainer(),
        cart: new DaoMySqlCartContainer(),
      };
    default:
      throw new Error("Storage not found");
  }
};

module.exports = getStorage;
