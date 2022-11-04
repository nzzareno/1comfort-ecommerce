const express = require("express");
const router = express.Router();

const {
  getAllMessages,
  getSingleMessage,
  creatingMessages,
  updatingMessage,
  deletingMessages,
  deletingOneMessage,
} = require("../controllers/messages");

router.get("/", getAllMessages);

router.post("/", creatingMessages );

router.delete("/", deletingMessages);

router.get("/:id", getSingleMessage);

router.patch("/:id", updatingMessage);

router.delete("/:id", deletingOneMessage);

module.exports = router;
