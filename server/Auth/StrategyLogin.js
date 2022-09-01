const Strategy = require("passport-local").Strategy;
const { UserModel } = require("../persistence/models/mongoPersistence");
const bcrypt = require("bcryptjs");

const StrategyLogin = new Strategy({ usernameField: "email" }, function (
  email,
  password,
  done
) {
  UserModel.findOne({ email })
    .lean()
    .exec((err, user) => {
      if (err) {
        return done(err, null);
      }

      if (!user) {
        return done("No user found", null);
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return done("Email or Password not valid", null);
      }

      return done(null, user);
    });
});

module.exports = StrategyLogin;
