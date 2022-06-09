const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const productRouter = require("../routes/product");
const cartRouter = require("../routes/cart");
 

class Server {
  constructor() {
    this.app = express();
    this.port = 8080;
    this.productsRoute = "/api/productos";
    this.cartRoute = "/api/carrito";
    this.settings();
    this.middlewares();
    this.routes();
    this.static();
  }

  settings() {
    this.app.set("port", process.env.PORT || this.port);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static(path.resolve(__dirname, "../../client/build")));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));

    this.app.use((req, res, next) => {
      if (req.originalUrl === "*") {
        res.status(404).json({
          message: "Not found",
        });
      }
      next();
    });
  }

  routes() {
    this.app.use(this.productsRoute, productRouter);
    this.app.use(this.cartRoute, cartRouter);
  }

  static() {
    this.app.use(express.static("public"));
  }

  listener() {
    this.app
      .listen(this.app.get("port"), () => {
        console.log(`Listening on port ${this.port}`);
      })
      .on("error", (error) => {
        res.status(503).json({
          message: "Server error",
          data: error,
        });
      });
  }
}

module.exports = Server;
