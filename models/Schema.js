const mongoose = require("mongoose");
mongoose.promise = Promise;

const ProductsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true, default: new Date().toUTCString() },
  description: { type: String, default: "-" },
  code: { type: String, default: "000000" },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  new: { type: Boolean, default: true },
  logo: { type: String },
  genre: { type: String },
  quantity: { type: Number, default: 0 },
});

const CartSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: new Date().toUTCString() },
  total: { type: Number, default: 0 },
  qtyProducts: { type: Number },
  currency_type: { type: String },
  products: { type: Array, ref: "Product" },
});

const MessageSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: new Date().toUTCString() },
  type: { type: String },
  email: { type: String },
  message: { type: String },
});

const OrderSchema = new mongoose.Schema({
  products: { type: Array, ref: "Product" },
  numOrder: { type: Number, required: true },
  status: { type: String, required: true, default: "generated" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true, default: new Date().toUTCString() },
  total: { type: Number, required: true },
  qtyProducts: { type: Number, required: true },
  currency_type: { type: String },
  email: { type: String },
  history: { type: Array, default: [] },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true},
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  googleId: { type: String },
});

const ProductModel = mongoose.model("Product", ProductsSchema);
const OrderModel = mongoose.model("Order", OrderSchema);
const MessageModel = mongoose.model("Message", MessageSchema);
const UserModel = mongoose.model("User", UserSchema);
const CartModel = mongoose.model("Cart", CartSchema);

module.exports = {
  ProductModel,
  OrderModel,
  MessageModel,
  CartModel,
  UserModel,
};
