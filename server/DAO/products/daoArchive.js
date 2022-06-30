const path = require("path");
const { ProductosContainer } = require("../../services/FS/containerFS");

class daoArchiveProducts extends ProductosContainer {
  constructor() {
    super(path.join(__dirname, "../../persistence/FS/products.json"));
  }
}

module.exports = daoArchiveProducts;
