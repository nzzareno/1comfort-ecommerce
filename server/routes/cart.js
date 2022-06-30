const express = require("express");
const router = express.Router();
const {
  creatingCartsWithProducts,
  listOfProducts,
  deleteCartx,
  addProductByID,
  getOne,
  deleteProductAndCartByID,
  entireCart,
} = require("../controllers/cart");

router.get("/", entireCart);
router.get("/:id/productos", listOfProducts); // fire, mongo, fs?
router.get("/:id/:idProd", getOne); // fire,mongo,fs
router.post("/", creatingCartsWithProducts); // fire, mongo, fs
router.post("/:id/productos", addProductByID); // fire,mongo, fs
router.delete("/:id", deleteCartx); // fire,mongo, fs
router.delete("/:id/productos/:id_prod", deleteProductAndCartByID); // fire, mongo, fs?

module.exports = router;
