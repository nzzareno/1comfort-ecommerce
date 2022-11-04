const {
  findAllOrders,
  findOrderById,
  findOrdersByUserId,
  createOrder,
  patchOrder,
  removeOrder,
} = require("../services/orders");
const logger = require("../logs/winston");
const localStorage = require("localStorage");
const { orderUserNodemailer } = require("../services/auth");

const gettingAllOrders = async (req, res) => {
  try {
    const orders = await findAllOrders();

    return res.status(200).json(orders);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: "Error getting orders!!",
    });
  }
};

const gettingOrdersByUserId = async (req, res) => {
  try {
    const orders = await findOrdersByUserId(req.params.id);
    return res.status(200).json(orders);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: "Error finding orders",
    });
  }
};

const gettingOrderById = async (req, res) => {
  try {
    const order = await findOrderById(req.params.id);
    return res.status(200).json(order);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: "Error finding order",
    });
  }
};

const addingOrder = async (req, res) => {
  try {
    const order = await createOrder(req.body);
    console.log(order)
    await orderUserNodemailer(order);
    return res.status(201).json(order);
  } catch (err) {
    logger.error(err.message);
    return res.status(500).json({
      message: "Error create the order",
    });
  }
};

const updatingOrder = async (req, res) => {
  try {
    const order = await patchOrder(req.params.id, req.body);
    return res.status(200).json(order);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: "Error updating order",
    });
  }
};

const deletingOrder = async (req, res) => {
  try {
    const order = await removeOrder(req.params.id);
    return res.status(200).json(order);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: "Error deleting order",
    });
  }
};

module.exports = {
  gettingAllOrders,
  gettingOrdersByUserId,
  gettingOrderById,
  addingOrder,
  updatingOrder,
  deletingOrder,
};
