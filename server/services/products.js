const { products: productsInStorage } = require("../DAO")();

const gettingProducts = () => {
  return productsInStorage.findAll();
};

const gettingProduct = (id) => {
  try {

    return productsInStorage.find(id);
  } catch (error) {
    return { message: error };
  }
};

const getProductByTerm = (term) => {
  return productsInStorage.findByTerm(term);
};

const saveProducts = (body) => {
  if (body.quantity > body.stock) {
    return { error: "Its not possible to add more products than the stock" };
  }
  const newStock = body.stock - body.quantity;
  return productsInStorage.save(body).then(async (product) => {
    await productsInStorage.update(product._id, { stock: newStock });
    return product;
  });
};

const updateProduct = (id, body) => {
  return productsInStorage.update(id, body);
};

const deleteAllProducts = () => {
  return productsInStorage.deleteAll();
};

const deleteOneProduct = (id) => {
  return productsInStorage.deleteOne(id);
};

module.exports = {
  gettingProducts,
  gettingProduct,
  saveProducts,
  updateProduct,
  deleteAllProducts,
  deleteOneProduct,
  getProductByTerm,
};
