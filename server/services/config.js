const mongoose = require("mongoose");

const mongoConnection = async (url) => {
  await mongoose
    .connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB" + err);
    });
};

module.exports = mongoConnection;
