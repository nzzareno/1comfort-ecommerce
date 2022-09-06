const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const comparePassword = (hash, password) => {
  return bcrypt.compareSync(password, hash);
};

const authVerified = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/user/getDetails");
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized",
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  authVerified,
};
