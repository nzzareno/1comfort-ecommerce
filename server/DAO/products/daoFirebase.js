const { ProductsFirebaseContainer } = require("../../services/FIREBASE/containerFirebase");

class DaoFirebaseProducts extends ProductsFirebaseContainer {
  constructor() {
    super("products");
  }
}

module.exports = DaoFirebaseProducts;