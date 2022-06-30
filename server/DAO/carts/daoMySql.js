const { KnexCartContainer } = require("../../services/MYSQL/containerMySql");

class DaoMySqlCartContainer extends KnexCartContainer {
  constructor() {
    super("cart");
  }
}

module.exports = DaoMySqlCartContainer;
