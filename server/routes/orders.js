const express = require("express");
const router = express.Router();
const {
  gettingOrdersByUserId,
  gettingOrderById,
  gettingAllOrders,
  addingOrder,
  updatingOrder,
  deletingOrder,
 
} = require("../controllers/orders");

router.get("/", gettingAllOrders);

router.post("/", addingOrder);

router.get("/user/:id", gettingOrdersByUserId);

router.get("/:id", gettingOrderById);

router.patch("/:id", updatingOrder);

router.delete("/:id", deletingOrder);

module.exports = router;
