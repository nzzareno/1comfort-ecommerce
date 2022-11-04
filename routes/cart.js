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
  deleteAllCarts,
} = require("../controllers/cart");
const sendMailPhone = require("../middlewares/nodemailer-twilio");

router.get("/", entireCart);
router.post("/", creatingCartsWithProducts);
router.get("/:id/productos", listOfProducts);
router.get("/:id/:idProd", getOne);
router.post("/:id/productos", addProductByID);
router.delete("/:id", deleteCartx);
router.delete("/", deleteAllCarts);
router.delete("/:id/productos/:id_prod", deleteProductAndCartByID);

module.exports = router;
