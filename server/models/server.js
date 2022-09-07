const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const mongoConnection = require("../services/config");
const productRouter = require("../routes/product");
const cartRouter = require("../routes/cart");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const logger = require("../logs/winston");
const passport = require("../Auth");
const Authentication = require("../routes/auth");
const User = require("../routes/user");

class Server {
  constructor() {
    this.app = express();
    this.port = 8080 || process.env.PORT;
    this.productsRoute = "/api/productos";
    this.cartRoute = "/api/carrito";
    this.authRoute = "/auth";
    this.userRoute = "/user";
    this.settings();
    this.middlewares();
    this.routes();
    this.static();
    this.startMongo();
  }

  settings() {
    this.app.set("port", process.env.PORT || this.port);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));

    this.app.use(
      session({
        secret: process.env.MY_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI,
        }),
      })
    );
    this.app.use(flash());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
  routes() {
    this.app.get("/", async (req, res) => {
      res.sendFile(path.resolve(__dirname, "../../client/build/index.html"));
    });
    this.app.use(this.productsRoute, productRouter);
    this.app.use(this.cartRoute, cartRouter);
    this.app.use(this.authRoute, Authentication);
    this.app.use(this.userRoute, User);
  }

  static() {
    this.app.use(express.static(path.resolve(__dirname, "../../client/build")));
  }

  async startMongo() {
    try {
      await mongoConnection(process.env.MONGO_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.log(error);
    }
  }

  listener() {
    this.app
      .listen(this.app.get("port"), () => {
        console.log(`Listening on port ${this.port}`);
      })
      .on("error", (err) => {
        logger.error(err);
        console.log(err);
      });
  }
}

module.exports = Server;
