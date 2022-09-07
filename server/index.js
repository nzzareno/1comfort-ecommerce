require("dotenv").config();
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const Server = require("./models/server");
const server = new Server();

server.listener();
