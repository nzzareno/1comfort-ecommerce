const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { UserModel } = require("../persistence/models/mongoPersistence");
const { hashPassword, comparePassword } = require("../utils/keys");

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      UserModel.findOne(
        {
          email: email,
        },
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, false, { message: "Email already exists" });
          }
          const newUser = new UserModel({
            email: email,
            password: hashPassword(password),
            age: req.body.age,
            avatar: req.body.avatar,
            nombre: req.body.nombre,
            phone: req.body.phone,
            address: req.body.address,
            message: "User created",
          });
          newUser.save((err) => {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      );
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      UserModel.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Email not found" });
        }
        if (!comparePassword(user.password, password)) {
          return done(null, false, { message: "Password incorrect" });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

module.exports = passport;
