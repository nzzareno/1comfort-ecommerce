const { CartModel } = require("../../models/Schema");
const {
  CartMongoContainer,
} = require("../../repositories/ContainerRepository");

class DaoMongoCartContainer extends CartMongoContainer {
  constructor() {
    super(CartModel);
  }
}

module.exports = DaoMongoCartContainer;
