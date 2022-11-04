const {
  gettingMessages,
  gettingMessage,
  saveMessages,
  updateMessage,
  deleteAllMessages,
  deleteOneMessage,
} = require("../services/messages");
const logger = require("../logs/winston");

const getAllMessages = async (req, res) => {
  try {
    return res.json(await gettingMessages());
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error getting messages" });
  }
};

const getSingleMessage = async (req, res) => {
  try {
    return res.json(await gettingMessage(req.params.id));
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "Message not found" });
  }
};

const creatingMessages = async (req, res) => {
  try {
    return res.status(201).json(await saveMessages(req.body));
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updatingMessage = async (req, res) => {
  try {
    return res.json(await updateMessage(req.params.id, req.body));
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Message not update" });
  }
};

const deletingMessages = async (req, res) => {
  try {
    return res.json(await deleteAllMessages());
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error deleting messages" });
  }
};

const deletingOneMessage = async (req, res) => {
  try {
    return res.json(await deleteOneMessage(req.params.id));
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error deleting message" });
  }
};

module.exports = {
  getAllMessages,
  getSingleMessage,
  creatingMessages,
  updatingMessage,
  deletingMessages,
  deletingOneMessage,
};
