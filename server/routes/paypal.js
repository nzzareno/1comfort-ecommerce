const express = require("express");
const router = express.Router();
const {
  createPayment,
  executePayment,
  cancelPayment,
} = require("../controllers/paypal");

router.post("/create-payment", createPayment);

router.get("/execute-payment", executePayment);

router.get("/cancel-payment", cancelPayment);

module.exports = router;
