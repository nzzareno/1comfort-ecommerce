const router = require("express").Router();
const { authUser } = require("../controllers/users");

router.post("/", authUser);

module.exports = router;
