const path = require("path");
const { CartContainer } = require("../../services/FS/containerFS");

class daoArchiveCart extends CartContainer {
  constructor() {
    super(path.join(__dirname, "../../persistence/FS/cart.json"));
  }
}

module.exports = daoArchiveCart;
