const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");


// BCRYPTJS

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const comparePassword = (hash, password) => {
  return bcrypt.compareSync(password, hash);
};


// JWT 

const generateAuthToken = async (user) => {
  return JWT.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "24h",
    }
  );
};

const verifyToken = async (token) => {
  try {
    return JWT.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (error) {
    return null;
  }
};

const jwtMiddelware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access forbidden" });
  }
  try {
    const verified = await verifyToken(token);
    if (!verified) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = verified;
    next();
  } catch (err) {
    console.error("Something wrong with auth middleware");
    res.status(500).json({ message: "You must provide a token!" });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  jwtMiddelware,
  generateAuthToken,
};
