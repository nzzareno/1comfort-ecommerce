const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSingleProduct,
  creatingProducts,
  updatingProduct,
  deletingProducts,
  deletingProduct,
  getByTerm,
  getCategoryByTerm,
} = require("../controllers/products");

router.get("/", getAllProducts);

router.post("/", creatingProducts);

router.delete("/", deletingProducts);

router.get("/:id", getSingleProduct);

router.get("/category/:term", getCategoryByTerm);

router.get("/genre/:term", getByTerm);

router.patch("/:id", updatingProduct);

router.delete("/:id", deletingProduct);

module.exports = router;
