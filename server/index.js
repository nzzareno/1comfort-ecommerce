require("dotenv").config();
const Sv = require("./models/server");
const server = new Sv();

server.listener();
