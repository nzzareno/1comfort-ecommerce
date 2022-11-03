const { ProductModel } = require("../../models/mongoPersistence");
const { ProductsMongoContainer } = require("../../repositories/containerMongo");

class DaoMongoProductsContainer extends ProductsMongoContainer {
  constructor() {
    super(ProductModel);
  }
}

module.exports = DaoMongoProductsContainer;
