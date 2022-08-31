const { cart: cartInStorage } = require("../DAO")();
const isAdmin = true;

const creatingCartsWithProducts = async (req, res) => {
  const carts = cartInStorage.save(req.body);
  if (isAdmin) {
    return res.status(200).json({
      message: "Cart created",
      data: await carts,
    });
  } else {
    return res.status(500).json({
      message: "Error creating cart",
    });
  }
};

const listOfProducts = async (req, res) => {
  const carts = cartInStorage.getProducts(req.params.id);
  if (isAdmin) {
    return res.status(200).json(await carts);
  } else {
    return res.status(500).json({
      message: "Error finding cart",
    });
  }
};

const entireCart = async (req, res) => {
  const carts = cartInStorage.getCarts();
  if (isAdmin) {
    return res.status(200).json(await carts);
  }
  return res.status(500).json({
    message: "Error finding cart",
  });
};

const getOne = async (req, res) => {
  const carts = cartInStorage.getOneProduct(req.params.id, req.params.idProd);
  if (isAdmin) {
    return res.status(200).json(await carts);
  } else {
    return res.status(500).json({
      message: "Error finding cart",
    });
  }
};

const addProductByID = async (req, res) => {
  const carts = cartInStorage.addProductAsignedById(req.params.id, req.body);
  if (isAdmin) {
    return res.status(200).json(await carts);
  }
  return res.status(500).json({
    message: "Error adding product",
  });
};

const deleteCartx = async (req, res) => {
  const carts = cartInStorage.deleteCart(req.params.id);
  if (isAdmin) {
    return res.status(200).json({
      message: "Cart deleted",
      data: await carts,
    });
  } else {
    return res.status(500).json({
      message: "Error deleting cart",
    });
  }
};

const deleteProductAndCartByID = async (req, res) => {
  const carts = cartInStorage.deleteOne(req.params.id, req.params.id_prod);
  if (isAdmin) {
    return {
      message: "Product deleted",
      data: await res.json(await carts),
    };
  } else {
    return {
      message: "Product not deleted",
      data: res.status(404).json(await carts),
    };
  }
};

module.exports = {
  creatingCartsWithProducts,
  listOfProducts,
  addProductByID,
  deleteCartx,
  getOne,
  deleteProductAndCartByID,
  entireCart,
};
