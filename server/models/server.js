const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const mongoConnection = require("../utils/config");
const productRouter = require("../routes/product");
const cartRouter = require("../routes/cart");
const userRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const processRouter = require("../routes/processInfo");
const orderRouter = require("../routes/orders");
const paypalRouter = require("../routes/paypal");
const messagesRouter = require("../routes/messages");
const logger = require("../logs/winston");
const messageService = require("../services/messages");

class Sv {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, {
      cors: {
        origin: "*",
      },
    });
    this.port = 8080;
    this.productsRoute = "/api/productos";
    this.cartRoute = "/api/carrito";
    this.userRoute = "/api/users";
    this.authRoute = "/api/auth";
    this.ordersRoute = "/api/orders";
    this.processRoute = "/api/process";
    this.paypalRoute = "/api/paypal";
    this.messagesRoute = "/api/chat";
    this.settings();
    this.middlewares();
    this.routes();
    this.sockets();
    this.startMongo();
  }

  settings() {
    this.app.set("port", process.env.PORT || this.port);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, "../build")));
    this.app.use(morgan("dev"));
  }
  routes() {
    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../build"));
    });
    this.app.use(this.productsRoute, productRouter);
    this.app.use(this.cartRoute, cartRouter);
    this.app.use(this.userRoute, userRouter);
    this.app.use(this.authRoute, authRouter);
    this.app.use(this.ordersRoute, orderRouter);
    this.app.use(this.processRoute, processRouter);
    this.app.use(this.paypalRoute, paypalRouter);
    this.app.use(this.messagesRoute, messagesRouter);
  }

  sockets() {
    this.io.on("connection", (socket) => {
      logger.info("New client connected " + socket.id);

      socket.on("get_messages", async () => {
        const messages = await messageService.gettingMessages();
        this.io.emit("messages", messages);
      });

      socket.on("send_message", async (data) => {
        this.io.emit("receive_message", data.data);
      });

      socket.on("disconnect", () => {
        logger.info("Client disconnected");
      });
    });
  }

  async startMongo() {
    try {
      await mongoConnection(process.env.MONGO_URI);
      logger.info("Connected to MongoDB");
    } catch (error) {
      logger.error(error);
    }
  }

  listener() {
    this.server
      .listen(this.app.get("port"), () => {
        logger.info(`Server on port ${this.app.get("port")}`);
      })
      .on("error", (error) => {
        logger.error(error);
        process.exit(1);
      });
  }
}

module.exports = Sv;
