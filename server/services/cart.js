const { cart: cartInStorage } = require("../DAO")();
require("dotenv").config();

const createCartAndSendingEmail = async (body) => {
  const cart = await cartInStorage.save(body);
  return cart;
};

const getListOfProductInCart = (body) => {
  return cartInStorage.getProducts(body);
};

const getEntireCart = () => {
  return cartInStorage.findAll();
};

const getOneItem = (id, idProd) => {
  return cartInStorage.getOneProduct(id, idProd);
};

const addById = (id, body) => {
  return cartInStorage.addProductAsignedById(id, body);
};

const deleteCarrito = (id) => {
  return cartInStorage.deleteCart(id);
};

const deleteAllFromCart = () => {
  return cartInStorage.deleteAll();
};

const removeProductAndCart = (id, idProd) => {
  return cartInStorage.deleteOne(id, idProd);
};

module.exports = {
  createCartAndSendingEmail,
  getListOfProductInCart,
  getEntireCart,
  getOneItem,
  addById,
  deleteCarrito,
  removeProductAndCart,
  deleteAllFromCart,
};
