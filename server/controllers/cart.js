const {
  createCartAndSendingEmail,
  getListOfProductInCart,
  getEntireCart,
  getOneItem,
  addById,
  deleteCarrito,
  deleteAllFromCart,
  removeProductAndCart,
} = require("../services/cart");
require("dotenv").config();

const creatingCartsWithProducts = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Cart created",
      data: createCartAndSendingEmail(req.body),
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating cart",
    });
  }
};

const listOfProducts = async (req, res) => {
  try {
    const carts = getListOfProductInCart(req.params.id);
    return res.status(200).json(await carts);
  } catch (error) {
    return res.status(500).json({
      message: "Error finding products of cart",
    });
  }
};

const entireCart = async (req, res) => {
  try {
    return res.status(200).json(await getEntireCart());
  } catch (error) {
    return res.status(500).json({
      message: "Error finding cart",
    });
  }
};

const getOne = async (req, res) => {
  try {
    return res
      .status(200)
      .json(await getOneItem(req.params.id, req.params.idProd));
  } catch (error) {
    return res.status(500).json({
      message: "Error finding cart",
    });
  }
};

const addProductByID = async (req, res) => {
  try {
    return res.status(200).json(await addById(req.params.id, req.body));
  } catch (error) {
    return res.status(500).json({
      message: "Error adding product",
    });
  }
};

const deleteCartx = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Cart deleted",
      data: await deleteCarrito(req.params.id),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting cart",
    });
  }
};

const deleteAllCarts = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Cart deleted",
      data: await deleteAllFromCart(),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting all cart",
    });
  }
}

const deleteProductAndCartByID = async (req, res) => {
  try {
    return {
      message: "Product deleted",
      data: await res.json(
        await removeProductAndCart(req.params.id, req.params.id_prod)
      ),
    };
  } catch (error) {
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
  deleteAllCarts,
};
