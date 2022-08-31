const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const comparePassword = (hash, password) => {
  return bcrypt.compareSync(password, hash);
};

const authVerified = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/signin");
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  authVerified,
};
