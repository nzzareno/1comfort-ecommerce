const { messages: messagesInStorage } = require("../DAO")();

const gettingMessages = () => {
  return messagesInStorage.findAll();
};

const gettingMessage = (id) => {
  try {
    return messagesInStorage.find(id);
  } catch (error) {
    return { message: error };
  }
};

const saveMessages = (body) => {
  return messagesInStorage.save(body);
};

const updateMessage = (id, body) => {
  return messagesInStorage.update(id, body);
};

const deleteAllMessages = () => {
  return messagesInStorage.deleteAll();
};

const deleteOneMessage = (id) => {
  return messagesInStorage.deleteOne(id);
};

module.exports = {
  gettingMessages,
  gettingMessage,
  saveMessages,
  updateMessage,
  deleteAllMessages,
  deleteOneMessage,
};
