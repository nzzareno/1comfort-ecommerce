const Strategy = require("passport-local").Strategy;
const { UserModel } = require("../persistence/models/mongoPersistence");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const RegisterStrategy = new Strategy(
  { passReqToCallback: true, usernameField: "email" },
  function (req, email, password, done) {
    UserModel.findOne({ email })
      .lean()
      .exec((err, user) => {
        if (err) {
          return done(err, null);
        }

        if (!user) {
          const encryptedPassword = bcrypt.hashSync(password, salt);
          const { nombre, age, phone, avatar, address } = req.body;

          let newUser = new UserModel({
            email,
            password: encryptedPassword,
            nombre: nombre,
            age: age,
            phone: phone,
            avatar: avatar,
            address: address,
          });

          newUser.save((error, inserted) => {
            if (error) {
              return done(error, null);
            }

            return done(null, inserted);
          });
        }
        if (user) {
          return done("User already exist. Please login!", null);
        }
      });
  }
);

module.exports = RegisterStrategy;
