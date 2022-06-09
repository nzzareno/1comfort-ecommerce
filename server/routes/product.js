const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  creatingProducts,
  updatingProduct,
  updatingProducts,
  deletingProducts,
  deletingProduct,
} = require("../controllers/products");

router.get("/", getAllProducts);

router.post("/", creatingProducts);

router.put("/", updatingProducts);

router.delete("/", deletingProducts);

router.get("/:id", getSingleProduct);

router.put("/:id", updatingProduct);

router.delete("/:id", deletingProduct);

module.exports = router;
