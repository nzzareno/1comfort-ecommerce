const { MessageModel } = require("../../models/mongoPersistence");
const { MessagesMongoContainer } = require("../../repositories/containerMongo");

class DaoMongoMessagesContainer extends MessagesMongoContainer {
  constructor() {
    super(MessageModel);
  }
}

module.exports = DaoMongoMessagesContainer;
