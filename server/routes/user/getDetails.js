const express = require("express");
const getDetails = express.Router();
const { UserModel } = require("../../persistence/models/mongoPersistence");
const { authVerified } = require("../../utils/keys");

getDetails.get("/getDetails", authVerified, (req, res) => {
  UserModel.findOne({
    where: {
      email: req.user,
    },
  })
    .then((user) => {
      const { nombre, age, address, phone, avatar } = user;
      res.status(200).send({
        nombre,
        age,
        address,
        phone,
        avatar,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: err,
      });
    });
});

module.exports = getDetails;
