const {
  CartFirebaseContainer,
} = require("../../services/FIREBASE/containerFirebase");

class DaoFirebaseCart extends CartFirebaseContainer {
  constructor(){
    super("carts");
  }
}
module.exports = DaoFirebaseCart;