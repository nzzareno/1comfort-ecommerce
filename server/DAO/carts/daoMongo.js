const { CartModel } = require("../../persistence/MONGODB/models/mongoPersistence");
const { CartMongoContainer } = require("../../services/MONGODB/containerMongo");

class DaoMongoCartContainer extends CartMongoContainer {
  constructor(){
    super(CartModel);
  }
}

module.exports = DaoMongoCartContainer;