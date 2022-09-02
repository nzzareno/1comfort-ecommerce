const { createTransport } = require("nodemailer");

const transport = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.TEST_EMAIL,
    pass: process.env.TEST_PASSWORD,
  },
});

const mailOptions = {
  from: `Servidor Node.js <${process.env.TEST_EMAIL}>`,
  to: process.env.TEST_EMAIL,
  subject: "NUEVO REGISTRO",
  html: `
    <h1 style= "color: green">Hola mundo</h1>
    <p>Este es un email de prueba desde Node.js con Nodemailer</p>
  `,
};

const sendMail = async (mailOptions) => {
  try {
    await transport.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
