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
      .catch((err) => console.log(err.message));

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

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(
      `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username:
            "AVpiznU1cdQI3YmVGeR-FWdH3TGyNm_MkGgKg68DZJRgRbTqdCnhNwR63bVQn7XKM2geGqIDVdxMZXX4",
          password:
            "EOjayLj_p8jQiLfTtx0s38byhjd7vxw4bjLs0TiEGCNuA2xewHiQ_Pp4n38N3Fv4NOelZl7I8QEYACSO",
        },
      }
    );
      console.log(access_token)
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders`,
      body,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return res.json(response.data);
  } catch (err) {
    console.log(err.message + " SE PUEDE!");
    return res.status(500).json({ message: err.message });
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
          username:
            "AVpiznU1cdQI3YmVGeR-FWdH3TGyNm_MkGgKg68DZJRgRbTqdCnhNwR63bVQn7XKM2geGqIDVdxMZXX4",
          password:
            "EOjayLj_p8jQiLfTtx0s38byhjd7vxw4bjLs0TiEGCNuA2xewHiQ_Pp4n38N3Fv4NOelZl7I8QEYACSO",
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const cancelPayment = async (req, res) => {
  try {
    return res.redirect("http://localhost:3000/");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPayment,
  executePayment,
  cancelPayment,
};
