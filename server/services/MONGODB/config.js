const mongoose = require("mongoose");

const mongoConnection = async (url) => {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MONGO DB INITIALIZED");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB" + err);
    });
};

module.exports = mongoConnection;
