const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: mongoose.Types.ObjectId,
  },
  title: { type: String, required: true },
  date: { type: Date, required: true, default: new Date().toUTCString() },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  new: { type: Boolean, default: true },
  logo: { type: String },
  genre: { type: String, required: true },
});

const CartSchema = mongoose.Schema({
  date: { type: Date, required: true, default: new Date().toUTCString() },
  products: { type: Array, ref: "Product" },
});

const UserSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  nombre: { type: String },
  address: { type: String },
  age: { type: Number },
  avatar: { type: String },
  phone: { type: String },
});

const ProductModel = mongoose.model("Product", ProductsSchema);
const UserModel = mongoose.model("User", UserSchema);
const CartModel = mongoose.model("Cart", CartSchema);

module.exports = {
  ProductModel,
  CartModel,
  UserModel,
};
