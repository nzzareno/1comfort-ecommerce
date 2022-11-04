const { OrderModel } = require("../../models/Schema");
const {
  OrderMongoContainer,
} = require("../../repositories/ContainerRepository");

class DaoMongoOrderContainer extends OrderMongoContainer {
  constructor() {
    super(OrderModel);
  }
}

module.exports = DaoMongoOrderContainer;
