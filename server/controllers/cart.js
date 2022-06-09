const Cart = require("../models/cart");
const carrito = new Cart("cart.json");
const isAdmin = true;

const creatingCartsWithProducts = async (req, res) => {
  const carts = carrito.createCart(req.body);
  if (isAdmin) {
    res.status(200).json({
      message: "Cart created",
      data: await carts,
    });
  } else {
    res.status(500).json({
      message: "Error creating cart",
    });
  }
};

const listOfProducts = async (req, res) => {
  const carts = carrito.getProductsInCart(req.params.id);
  if (isAdmin) {
    res.status(200).json(await carts);
  } else {
    res.status(500).json({
      message: "Error finding cart",
    });
  }
};

const addProductByID = async (req, res) => {
  const carts = carrito.addProduct(req.params.id, req.body);

  if (isAdmin) {
    res.status(200).json({
      message: "Product added",
      data: await carts,
    });
  } else {
    res.status(500).json({
      message: "Error adding product",
    });
  }
};

const deleteCartx = async (req, res) => {
  const carts = carrito.deleteCart(req.params.id);
  if (isAdmin) {
    res.status(200).json({
      message: "Cart deleted",
      data: await carts,
    });
  } else {
    res.status(500).json({
      message: "Error deleting cart",
    });
  }
};

const deleteProductAndCartByID = async (req, res) => {
  const carts = carrito.deleteAllProductAndCart(
    req.params.id,
    req.params.id_prod
  );
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
  deleteProductAndCartByID,
};
