const twilio = require("twilio");
require("dotenv").config();

const cliente = twilio(
  "AC3bbc2c71f06f3b4a6d448d9eb1e23a03",
  "b71a1f4849b483fe5f989f5dd019e423"
);

const sendingWhatsapp = async () => {
  try {
    const message = await cliente.messages.create({
      body: "Hola, soy un mensaje de prueba de twilio wh",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5493535698524",
    });

    console.log(message);
  } catch (error) {
    console.log(error.message);
  }
};

sendingWhatsapp();
