const nodemailer = require("nodemailer");
const twilio = require("twilio");
const logger = require("../logs/winston");
const axios = require("axios");
const localStorage = require("localStorage");


const sendMailPhone = async (req, res, next) => {
  const users = await axios
    .get("https://one-comfort.herokuapp.com/api/auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenaso")}`,
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  const itemsCart = await axios
    .get(`https://one-comfort.herokuapp.com/api/carrito`)
    .then((response) => response.data)
    .catch((err) => console.log(err));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.TEST_EMAIL,
      pass: process.env.TEST_PASSWORD,
    },
  });

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const sendSms = async () => {
    await client.messages
      .create({
        body: "Your order has been received and is being processed",
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.TEST_PHONE_NUMBER,
      })
      .then((message) => logger.info(message.sid));
  };

  const dateFormatter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const mailOptions = {
    from: `One Comfort Associations`,
    // SI DESEAMOS ENVIAR EL EMAIL AL ADMINISTRADOR Y NO AL USUARIO REGISTRADO DEBEMOS
    // REEMPLAZAR to: email por to: process.env.TEST_EMAIL
    to: users.email,
    subject: `🎯 Your new order is on its way to you, ${users.firstname}`,
    // html: `
    //   <h1>
    //   Hello, thank you for having trusted and made the purchase with us!
    //   </h1>
    //   ${req.body.products.map((p) => {
    //     return `
    //     <div>
    //     <ul>
    //       <li>Purchase identifier: ${p.id}</li>
    //       <li>Product title: ${p.title}</li>
    //       <li>Date: ${dateFormatter(p.date)}</li>
    //       <li>Price: $${p.price}</li>
    //       <li>Quantity: x${p.quantity}</li>
    //       <li>Description: ${p.description}</li>
    //       <li>Code of product: ${p.code}</li>
    //     </ul>
    //   </div>
    //       `;
    //   })}
    //   `,
  };

  transporter.sendMail(mailOptions);
  sendSms();
  (async () => {
    try {
      const message = await client.messages.create({
        body: `NUEVO PEDIDO DE: ${users.firstname} || ${users.email}`,
        from: process.env.TWILIO_PHONE_NUMBER_WHATSAPP,
        to: process.env.TWILIO_PHONE_SANDBOX,
      });
      logger.info(message);
      next();
    } catch (error) {
      logger.error(error.message);
    }
  })();
};

module.exports = sendMailPhone;
