const passport = require("passport");
const { UserModel } = require("../persistence/models/mongoPersistence");

//Serialize user with passport using hes/her email
passport.serializeUser(function (email, done) {
  done(null, email);
});

//Deserialize user with passport using hes/her email
passport.deserializeUser(function (email, done) {
  done(null, email);
});

//Requiring Login - Register strategy files
const StrategyLogin = require('./StrategyLogin');
const RegisterStrategy = require("./RegisterStrategy");
//Using the above
passport.use("local-login", StrategyLogin);
passport.use("local-register", RegisterStrategy);

module.exports = passport;
// passport.serializeUser((user, cb) => {
//   cb(null, user.id);
// });

// passport.deserializeUser((id, cb) => {
//   UserModel.findOne({ _id: id }, (err, user) => {
//     const userInformation = {
//       email: user.email,
//     };
//     cb(err, userInformation);
//   });
// });

// passport.serializeUser(function (email, done) {
//   done(null, email);
// });

// passport.deserializeUser(function (email, done) {
//   done(null, email);
// });

// passport.serializeUser((user, done) => {
//   done(null, { _id: user._id });
// });

// passport.deserializeUser((id, done) => {
//   UserModel.findOne(
//     { _id: id },
//     "email nombre age avatar phone address",
//     (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       done(null, user);
//     }
//   );
// });
