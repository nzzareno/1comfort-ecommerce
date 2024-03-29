const axios = require("axios");
const { orderUserNodemailer } = require("../services/auth");

const createPayment = async (req, res) => {
  try {
    const cart = await axios
      .get(
        `${
          process.env.NODE_ENV === "production"
            ? "https://onecomfort.up.railway.app"
            : "http://localhost:8080"
        }/api/carrito`,
        {}
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));

    const itemsInOrder = cart.map((el) => el.products);
    const totalOfProducts = cart.map((el) => el.total);
    const total = totalOfProducts[totalOfProducts.length - 1];

    const body = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total,
              },
            },
          },
          description: "Buy from One Comfort clothes",
          items: itemsInOrder[itemsInOrder.length - 1].map((el) => {
            return {
              name: el.title,
              unit_amount: {
                currency_code: "USD",
                value: el.price,
              },
              quantity: el.quantity,
            };
          }),
        },
      ],
      application_context: {
        brand_name: "One Comfort",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
      },
    };

    const rta = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      body,
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_SECRET,
        },

        headers: {
          "Content-Type": "application/json",
        },
        json: true,
      }
    );

    return await res.json(rta.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const executePayment = async (req, res) => {
  const { token } = req.query;

  try {
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_SECRET,
        },

        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await res.json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const cancelPayment = async (req, res) => {
  try {
    return await res.redirect("http://localhost:3000/");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPayment,
  executePayment,
  cancelPayment,
};
