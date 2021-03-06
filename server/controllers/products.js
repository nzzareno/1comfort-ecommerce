const { products: productsInStorage } = require("../DAO")();

const getAllProducts = async (req, res) => {
  try {
    return res.json(await productsInStorage.findAll());
  } catch (error) {
    console.log("FAIL " + error);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await productsInStorage.find(req.params.id);
    return res.json(product);
  } catch (error) {
    console.log("FAIL " + error);
  }
};

const creatingProducts = async (req, res) => {
  try {
    // if (
    //   !req.body.title &&
    //   !req.body.price &&
    //   !req.body.image &&
    //   !req.body.description &&
    //   !req.body.stock &&
    //   !req.body.code &&
    //   !req.body.category &&
    //   !req.body.new &&
    //   !req.body.logo &&
    //   !req.body.genre
    // ) {
    //   res.status(400).json({
    //     error: "Bad Request",
    //     message: "All data are required",
    //   });
    // }
    productsInStorage.save(req.body);
    return res.json({
      message: "Product created!",
    });
  } catch (error) {
    console.log("FAIL " + error);
  }
};

const updatingProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = productsInStorage.update(id, req.body);
    return res.json(await producto);
  } catch (error) {
    console.log("FAIL " + error);
  }
};

const deletingProducts = async (req, res) => {
  try {
    await productsInStorage.deleteAll();
    return res.json({ message: "Products removed!" });
  } catch (error) {
    console.log("FAIL " + error);
  }
};

const deletingProduct = async (req, res) => {
  try {
    const id = req.params.id;
    productsInStorage.deleteOne(id);
    res.json({ message: "Product removed!" });
  } catch (error) {
    console.log("FAIL " + error);
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
