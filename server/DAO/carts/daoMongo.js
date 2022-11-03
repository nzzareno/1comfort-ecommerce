const { CartModel } = require("../../models/mongoPersistence");
const { CartMongoContainer } = require("../../repositories/containerMongo");

class DaoMongoCartContainer extends CartMongoContainer {
  constructor() {
    super(CartModel);
  }
}

module.exports = DaoMongoCartContainer;
