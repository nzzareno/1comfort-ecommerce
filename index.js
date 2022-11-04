require("dotenv").config();
const Sv = require("./server");
const server = new Sv();

server.listener();
