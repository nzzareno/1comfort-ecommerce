const { cart: cartInStorage } = require("../DAO")();
const isAdmin = true;
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const logger = require('../logs/winston')
require("dotenv").config();

const creatingCartsWithProducts = async (req, res) => {
  const carts = cartInStorage.save(req.body);

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
    process.env.TWILIO_TOKEN_V2
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

  const mailOptions = {
    from: `One Comfort Associations`,
    // SI DESEAMOS ENVIAR EL EMAIL AL ADMINISTRADOR Y NO AL USUARIO REGISTRADO DEBEMOS
    // REEMPLAZAR to: email por to: process.env.TEST_EMAIL
    to: process.env.TEST_EMAIL,
    subject: `NUEVO PEDIDO DE: ${req.body.users.nombre.split(" ")[0]} || ${
      req.body.users.email
    }`,
    html: `
      <h1>
      Hola, gracias por haber confiado y realizado la compra con nosotros!
      </h1>
      ${req.body.products.map((p) => {
        return `
        <div>
        <ul>
          <li>Identificador de compra: ${p.id}</li>
          <li>Product title: ${p.title}</li>
          <li>Date: ${p.date}</li>
          <li>Price: ${p.price}</li>
          <li>Quantity: ${p.quantity}</li>
          <li>Description: ${p.description}</li>
          <li>Code of product: ${p.code}</li>
        </ul>
      </div>
          `;
      })}
      `,
  };

  if (isAdmin) {
    transporter.sendMail(mailOptions);
    sendSms();
    (async () => {
      try {
        const message = await client.messages.create({
          body: `NUEVO PEDIDO DE: ${req.body.users.nombre.split(" ")[0]} || ${
            req.body.users.email
          }`,
          from: process.env.TWILIO_PHONE_NUMBER_WHATSAPP,
          to: process.env.TWILIO_PHONE_SANDBOX,
        });
       logger.info(message)
      } catch (error) {
        logger.error(error.message)
      }
    })();
    return res.status(200).json({
      message: "Cart created",
      data: await carts,
    });
  } else {
    return res.status(500).json({
      message: "Error creating cart",
    });
  }
};

const listOfProducts = async (req, res) => {
  const carts = cartInStorage.getProducts(req.params.id);
  if (isAdmin) {
    return res.status(200).json(await carts);
  } else {
    return res.status(500).json({
      message: "Error finding cart",
    });
  }
};

const entireCart = async (req, res) => {
  const carts = cartInStorage.findAll();
  if (isAdmin) {
    return res.status(200).json(await carts);
  }
  return res.status(500).json({
    message: "Error finding cart",
  });
};

const getOne = async (req, res) => {
  const carts = cartInStorage.getOneProduct(req.params.id, req.params.idProd);
  if (isAdmin) {
    return res.status(200).json(await carts);
  } else {
    return res.status(500).json({
      message: "Error finding cart",
    });
  }
};

const addProductByID = async (req, res) => {
  const carts = cartInStorage.addProductAsignedById(req.params.id, req.body);
  if (isAdmin) {
    return res.status(200).json(await carts);
  }
  return res.status(500).json({
    message: "Error adding product",
  });
};

const deleteCartx = async (req, res) => {
  const carts = cartInStorage.deleteCart(req.params.id);
  if (isAdmin) {
    return res.status(200).json({
      message: "Cart deleted",
      data: await carts,
    });
  } else {
    return res.status(500).json({
      message: "Error deleting cart",
    });
  }
};

const deleteProductAndCartByID = async (req, res) => {
  const carts = cartInStorage.deleteOne(req.params.id, req.params.id_prod);
  if (isAdmin) {
    return {
      message: "Product deleted",
      data: await res.json(await carts),
    };
  } else {
    return {
      message: "Product not deleted",
      data: res.status(404).json(await carts),
    };
  }
};

module.exports = {
  creatingCartsWithProducts,
  listOfProducts,
  addProductByID,
  deleteCartx,
  getOne,
  deleteProductAndCartByID,
  entireCart,
};
