const Strategy = require("passport-local").Strategy;
const { UserModel } = require("../persistence/models/mongoPersistence");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const nodemailer = require("nodemailer");

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

          const transport = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
              user: process.env.TEST_EMAIL,
              pass: process.env.TEST_PASSWORD,
            },
          });

          const mailOptions = {
            from: `One Comfort Associations`,
            // SI DESEAMOS ENVIAR EL EMAIL AL ADMINISTRADOR Y NO AL USUARIO REGISTRADO DEBEMOS
            // REEMPLAZAR to: email por to: process.env.TEST_EMAIL

            to: email,
            subject: `NUEVO REGISTRO`,
            html: `
              <h1>
              Hola ${
                nombre.split(" ")[0]
              }, gracias por registrarte en nuestra plataforma
              </h1>
                <div>
                <img src="${avatar}" />
                <h3>
                  Te deseamos mucha suerte en tu nueva aventura
                </h3>
                <h4>
                Con tus ${age} años queda mucho camino que recorrer!
                </h4>
                <p>
                Nombre completo: ${nombre} 
                </p>
                <p>
                Edad: ${age}
                </p>
                <p>
                Direccion: ${address}
                </p>
                <p>
                Telefono: ${phone}
                </p>
                </div>
              `,
          };

          let newUser = new UserModel({
            email,
            password: encryptedPassword,
            nombre: nombre,
            age: age,
            phone: phone,
            avatar: avatar,
            address: address,
          });

          // passport + nodemailer transport
          newUser.save((err, user) => {
            if (err) {
              return done(err, null);
            }
            transport.sendMail(mailOptions);
            return done(null, user);
          });
        }
        if (user) {
          return done("User already exist. Please login!", null);
        }
      });
  }
);

module.exports = RegisterStrategy;
