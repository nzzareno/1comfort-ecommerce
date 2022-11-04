const { MessageModel } = require("../../models/Schema");
const {
  MessagesMongoContainer,
} = require("../../repositories/ContainerRepository");

class DaoMongoMessagesContainer extends MessagesMongoContainer {
  constructor() {
    super(MessageModel);
  }
}

module.exports = DaoMongoMessagesContainer;
