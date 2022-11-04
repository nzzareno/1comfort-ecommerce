const { UserModel } = require("../models/Schema");
const { registeredUserNodemailer } = require("../services/users");
const { hashPassword, generateAuthToken } = require("../utils/keys");
const localStorage = require("localStorage");

const authUser = async (req, res) => {
  try {
    const { firstname, lastname, phone, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = hashPassword(password);
    const newUser = new UserModel({
      firstname,
      lastname,
      phone,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const token = await generateAuthToken(savedUser);
    localStorage.setItem("tokenaso", token);
    registeredUserNodemailer(newUser);
    return res.status(201).json({
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authUser,
};
