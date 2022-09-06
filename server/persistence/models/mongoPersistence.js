const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.promise = Promise;

const ProductsSchema = new mongoose.Schema({
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
  quantity: { type: Number },
});

const CartSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: new Date().toUTCString() },
  total: { type: Number, default: 0 },
  qtyProducts: { type: Number },
  products: { type: Array, ref: "Product" },
});

const UserSchema = new mongoose.Schema({
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

// UserSchema.methods = {
//   checkPassword: function (inputPassword) {
//     return bcrypt.compareSync(inputPassword, this.password);
//   },
//   hashPassword: function (plainTextPassword) {
//     return bcrypt.hashSync(plainTextPassword, 10);
//   },
// };

// UserSchema.pre("save", function (next) {
//   if (!this.password) {
//     console.log("=======NO PASSWORD PROVIDED=======");
//     next();
//   } else {
//     this.password = this.hashPassword(this.password);
//     next();
//   }
// });

const ProductModel = mongoose.model("Product", ProductsSchema);
const UserModel = mongoose.model("User", UserSchema);
const CartModel = mongoose.model("Cart", CartSchema);

module.exports = {
  ProductModel,
  CartModel,
  UserModel,
};
