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
const { authVerified } = require("../utils/keys");
const logger = require("../logs/winston");
const passport = require("../services/passport");

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
    this.startMongo();
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

    this.app.use(
      session({
        secret: process.env.MY_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI,
          ttl: 24 * 60 * 60,
        }),
      })
    );
    this.app.use(flash());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
  routes() {
    this.app.use(this.productsRoute, productRouter);
    this.app.use(this.cartRoute, cartRouter);

    this.app.get("/", authVerified, (req, res) => {
      console.log("HE AQUI");
      return res.send("ALOHA");
    });

    this.app.get(
      "/signin",
      (req, res, next) => {
        logger.info(` ${req.method} ${req.url} with port ${process.env.PORT}`);
        next();
      },
      async (req, res) => {
        await passport.authenticate("register");
        return res.redirect("/signup");
      }
    );

    this.app.get(
      "/signup",
      (req, res, next) => {
        logger.info(` ${req.method} ${req.url} with port ${process.env.PORT}`);
        next();
      },
      async (req, res) => {
        await passport.authenticate("login");
        return res.redirect("/");
      }
    );

    this.app.post(
      "/signin",
      (req, res, next) => {
        logger.info(` ${req.method} ${req.url} with port ${process.env.PORT}`);
        next();
      },
      passport.authenticate("register", {
        successRedirect: "/signup",
        failureRedirect: "/signin",
        failureFlash: true,
      })
    );

    this.app.post(
      "/signup",
      (req, res, next) => {
        logger.info(` ${req.method} ${req.url} with port ${process.env.PORT}`);
        next();
      },
      passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true,
      })
    );

    this.app.get(
      "/logout",
      (req, res, next) => {
        logger.info(` ${req.method} ${req.url} with port ${process.env.PORT}`);
        next();
      },
      (req, res) => {
        req.logout((err) => {
          if (err) {
            console.log(err);
          }
          res.redirect("/");
        });
      }
    );
  }

  static() {
    this.app.use(express.static("public"));
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
      .on("error", (error) => {
        res.status(503).json({
          message: "Server error",
          data: error,
        });
      });
  }
}

module.exports = Server;
