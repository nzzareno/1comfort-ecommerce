const {
  KnexProductsContainer,
} = require("../../services/MYSQL/containerMySql");

class DaoMySqlProductsContainer extends KnexProductsContainer {
  constructor() {
    super("products");
  }
}

module.exports = DaoMySqlProductsContainer;
