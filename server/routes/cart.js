const express = require("express");
const router = express.Router();
const {
  creatingCartsWithProducts,
  listOfProducts,
  deleteCartx,
  addProductByID,
  deleteProductAndCartByID,
} = require("../controllers/cart");

router.get("/:id/productos", listOfProducts);
router.post("/", creatingCartsWithProducts);
router.post("/:id/productos", addProductByID);
router.delete("/:id", deleteCartx);
router.delete("/:id/productos/:id_prod", deleteProductAndCartByID);

module.exports = router;
