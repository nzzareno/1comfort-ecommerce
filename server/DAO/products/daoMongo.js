
const { ProductModel } = require("../../persistence/MONGODB/models/mongoPersistence");
const {ProductsMongoContainer} = require("../../services/MONGODB/containerMongo");

class DaoMongoProductsContainer extends ProductsMongoContainer {
  constructor() {
    super(ProductModel);
  }
}

module.exports = DaoMongoProductsContainer;