const { UserModel } = require("../models/Schema");
const { comparePassword, generateAuthToken } = require("../utils/keys");
const localStorage = require("localStorage");

const authLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = comparePassword(user.password, password);
    if (!isMatch) res.status(409).json({ message: "Invalid user or password" });
    const token = await generateAuthToken(user);
    localStorage.setItem("tokenaso", token);
    return res.status(201).json({
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postGoogleUser = async (req, res) => {
  try {
    const googleCheck = {
      token: req.body.token,
      user: req.body.user,
    };

    const user = await UserModel.findOne({ email: googleCheck.user.email });

    if (user) {
      const token = await generateAuthToken(user);
      localStorage.setItem("tokenaso", token);

      return res.status(201).json({ token, user });
    } else {
      const newUser = new UserModel({
        firstname: googleCheck.user.given_name,
        lastname: googleCheck.user.family_name,
        email: googleCheck.user.email,
      });
      const savedUser = await newUser.save();
      const token = await generateAuthToken(savedUser);
      localStorage.setItem("tokenaso", token);
      return res.status(201).json({ token, user: savedUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authLogin,
  getUser,
  postGoogleUser,
};