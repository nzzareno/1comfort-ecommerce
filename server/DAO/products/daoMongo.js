const { ProductModel } = require("../../persistence/models/mongoPersistence");
const { ProductsMongoContainer } = require("../../services/containerMongo");

class DaoMongoProductsContainer extends ProductsMongoContainer {
  constructor() {
    super(ProductModel);
  }
}

module.exports = DaoMongoProductsContainer;
