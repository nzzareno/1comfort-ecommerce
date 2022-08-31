const { CartModel } = require("../../persistence/models/mongoPersistence");
const { CartMongoContainer } = require("../../services/containerMongo");

class DaoMongoCartContainer extends CartMongoContainer {
  constructor(){
    super(CartModel);
  }
}

module.exports = DaoMongoCartContainer;