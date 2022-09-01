const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSingleProduct,
  creatingProducts,
  updatingProduct,
  deletingProducts,
  deletingProduct,
} = require("../controllers/products");
 

router.get("/", getAllProducts);

router.post("/", creatingProducts);

router.delete("/", deletingProducts);

router.get("/:id", getSingleProduct);

router.patch("/:id", updatingProduct);

router.delete("/:id", deletingProduct);

module.exports = router;
