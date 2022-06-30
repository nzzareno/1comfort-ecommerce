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

const ProductModel = mongoose.model("Product", ProductsSchema);

const CartSchema = mongoose.Schema({
  date: { type: Date, required: true, default: new Date().toUTCString() },
  products: { type: Array, ref: "Product" },
});

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = {
  ProductModel,
  CartModel,
};
