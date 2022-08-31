const { UserModel } = require("../../persistence/models/mongoPersistence");
const { UsersMongoContainer } = require("../../services/containerMongo");

class DaoMongoUsersContainer extends UsersMongoContainer {
  constructor() {
    super(UserModel);
  }
}

module.exports = DaoMongoUsersContainer;
