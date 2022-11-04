const { ProductModel } = require("../../models/Schema");
const {
  ProductsMongoContainer,
} = require("../../repositories/ContainerRepository");

class DaoMongoProductsContainer extends ProductsMongoContainer {
  constructor() {
    super(ProductModel);
  }
}

module.exports = DaoMongoProductsContainer;
