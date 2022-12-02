const {
  gettingProducts,
  gettingProduct,
  saveProducts,
  updateProduct,
  deleteAllProducts,
  deleteOneProduct,
  getProductByTerm,
  getProductsByCategories,
} = require("../services/products");
const logger = require("../logs/winston");

const getAllProducts = async (req, res) => {
  try {
    return res.json(await gettingProducts());
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error getting products" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    return res.json(await gettingProduct(req.params.id));
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "Product not found" });
  }
};

const getByTerm = async (req, res) => {
  try {
    return res.json(await getProductByTerm(req.params.term));
  } catch (error) {
    logger.error(error);
    res.status(404).json({ message: "Product not found" });
  }
};

const getCategoryByTerm = async (req, res) => {
  try {
    return res.json(await getProductsByCategories(req.params.term));
  } catch (error) {
    logger.error(error);
    res.status(404).json({ message: "Product with that category not found" });
  }
};

const creatingProducts = async (req, res) => {
  try {
    return res.status(201).json(await saveProducts(req.body));
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updatingProduct = async (req, res) => {
  try {
    return res.json(await updateProduct(req.params.id, req.body));
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Product not update" });
  }
};

const deletingProducts = async (req, res) => {
  try {
    return res.json(await deleteAllProducts());
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Products not removed" });
  }
};

const deletingProduct = async (req, res) => {
  try {
    return res.json(await deleteOneProduct(req.params.id));
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Product not removed" });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  updatingProduct,
  deletingProduct,
  deletingProducts,
  creatingProducts,
  getByTerm,
  getCategoryByTerm,
};
