const nodemailer = require("nodemailer");
const axios = require("axios");
const localStorage = require("localStorage");

const orderUserNodemailer = async (order) => {
  const users = await axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? "https://onecomfort.up.railway.app"
        : "http://localhost:8080"
    }/api/auth`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenaso")}`,
      },
    }
  );
  const user = users?.data;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.TEST_EMAIL,
      pass: process.env.TEST_PASSWORD,
    },
  });
  const dateFormatter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };
  const mailOptions = {
    from: `One Comfort Associations`,
    to: user.email,
    subject: `🎯 ${user.firstname}, here is your One Comfort order: ${order.numOrder}`,
    html: `
      <h1>
      Order purchase data:
      </h1>
      <div>
      <ul>
      <li>
      PURCHASE ID: ${order._id}
      </li>
      <li>
      ORDER NUMBER: ${order.numOrder}  
      </li>
      <li>
      ORDER DATE: ${dateFormatter(order.date)}
      </li>
      
      <li>
      ORDER STATUS: ${order.history[0].status}
      </li>
      <li>
      ITEMS: ${order.products.map((item) => {
        return `
          <ul>
          <li>
          ITEM NAME: ${item.title}
          </li>
          <li>
          PRICE: U$D${item.price}
          </li>
          <li>
          QUANTITY: ${item.quantity}
          </li>
          </ul>
          
          `;
      })}
      </li>
      <li>
      PRODUCTS QUANTITY: ${order.qtyProducts}
      </li>
      <li>
      ORDER TOTAL: U$D${order.total}
      </li>
      </ul>
      </div>
      `,
  };

  transporter.sendMail(mailOptions);
  return mailOptions;
};

module.exports = {
  orderUserNodemailer,
};
