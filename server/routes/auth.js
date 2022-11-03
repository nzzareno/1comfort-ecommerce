const router = require("express").Router();
const passport = require("passport");
const { authLogin, getUser, postGoogleUser } = require("../controllers/auth");
const { jwtMiddelware } = require("../utils/keys");

router.post("/", authLogin);

router.get("/", jwtMiddelware, getUser);

router.post("/google", postGoogleUser);

module.exports = router;
