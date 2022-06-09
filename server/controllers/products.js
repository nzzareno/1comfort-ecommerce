const Products = require("../models/products");
let items = new Products("products.json");

const getAllProducts = async (req, res) => {
  try {
    const products = items.getProducts();
    return res.json(await products);
  } catch (error) {
    console.log("FAIL " + error);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await items.getProduct(req.params.id);
    return res.json(product);
  } catch (error) {
    console.log("FAIL " + error);
  }
};

const creatingProducts = async (req, res) => {
  if (
    !req.body.title &&
    !req.body.price &&
    !req.body.image &&
    !req.body.description &&
    !req.body.stock &&
    !req.body.code &&
    !req.body.category && 
    !req.body.new &&
    !req.body.logo
  ) {
    res.status(400).json({
      error: "Bad Request",
      message: "All data are required",
    });
  }

  const products = items.createProducts(req.body);
  return res.json(await products);
};

const updatingProducts = async (req, res) => {
  const productos = items.updateProducts(req.body);
  return res.json(await productos);
};

const updatingProduct = async (req, res) => {
  const id = req.params.id;
  const producto = items.updateProduct(id, req.body);
  res.json(await producto);
};

const deletingProducts = async (req, res) => {
  const products = items.deleteProducts();
  res.json(await products);
};

const deletingProduct = async (req, res) => {
  const id = req.params.id;
  items.deleteProduct(id);
  res.json({ message: "Product removed!" });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  updatingProduct,
  updatingProducts,
  deletingProduct,
  deletingProducts,
  creatingProducts,
};
