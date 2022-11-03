const { orders: orderInStorage } = require("../DAO")();
const productsDTO = require("../DTO/products");
const sendMailPhone = require("../middlewares/nodemailer-twilio");
require("dotenv").config();

const findAllOrders = async () => {
  const orders = await orderInStorage.getAllOrders();
  return orders;
};

const findOrderById = async (id) => {
  const order = await orderInStorage.getOneOrder(id);
  return order;
};

const findOrdersByUserId = async (id) => {
  const orders = await orderInStorage.getOrderByUser(id);
  return orders;
};

const createOrder = async (body) => {
  const dateFormatter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const order = await orderInStorage.save({
    ...body,
    date: dateFormatter(new Date()),
    products: body.products.map((p) => {
      return new productsDTO(p);
    }),
    numOrder: Math.floor(Math.random() * 1000000),
    total: body.total,
    qtyProducts: body.qtyProducts,
    currency_type: body.currency_type,
  });

  return order;
};

const patchOrder = async (id, body) => {
  const order = await orderInStorage.update(id, body);
  return order;
};

const removeOrder = async (id) => {
  const order = await orderInStorage.deleteOrder(id);
  return order;
};

module.exports = {
  findAllOrders,
  findOrderById,
  findOrdersByUserId,
  createOrder,
  patchOrder,
  removeOrder,
};
