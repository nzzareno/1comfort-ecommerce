const { OrderModel } = require("../../models/mongoPersistence");
const { OrderMongoContainer } = require("../../repositories/containerMongo");

class DaoMongoOrderContainer extends OrderMongoContainer {
  constructor() {
    super(OrderModel);
  }
}

module.exports = DaoMongoOrderContainer;
