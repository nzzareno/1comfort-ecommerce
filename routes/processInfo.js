const express = require("express");
const router = express.Router();
const {processInfo} = require("../controllers/processInfo");

router.get("/info", processInfo);

module.exports = router;