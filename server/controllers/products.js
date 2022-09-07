const { products: productsInStorage } = require("../DAO")();
const logger = require("../logs/winston");

const getAllProducts = async (req, res) => {
  try {
    return res.json(await productsInStorage.findAll());
  } catch (error) {
    logger.error(error)
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await productsInStorage.find(req.params.id);
    return res.json(product);
  } catch (error) {
    logger.error(error)
  }
};

const creatingProducts = async (req, res) => {
  try {
    productsInStorage.save(req.body);
    return res.json({
      message: "Product created!",
    });
  } catch (error) {
    logger.error(error)
  }
};

const updatingProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = productsInStorage.update(id, req.body);
    return res.json(await producto);
  } catch (error) {
    logger.error(error)
  }
};

const deletingProducts = async (req, res) => {
  try {
    await productsInStorage.deleteAll();
    return res.json({ message: "Products removed!" });
  } catch (error) {
    logger.error(error)
  }
};

const deletingProduct = async (req, res) => {
  try {
    const id = req.params.id;
    productsInStorage.deleteOne(id);
    res.json({ message: "Product removed!" });
  } catch (error) {
    logger.error(error)
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  updatingProduct,
  deletingProduct,
  deletingProducts,
  creatingProducts,
};
